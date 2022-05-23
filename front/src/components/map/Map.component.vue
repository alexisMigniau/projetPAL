<template>
    <div class="map">
        <Infos
            v-if="showInfos && isPointInfosFull"
            :title="pointInfos.titre"
            :marked="pointInfos.marked"
            :id="pointInfos.id"
            @close="handleClose"
            @change="switchMarked"
        />
        <GlobalInfos />
        <l-map ref="map" :zoom="zoom" :center="center" @ready="load()">
            <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
            <l-geo-json
                :geojson="panneaux"
                :options="optionsPanneaux"
            />
            <l-geo-json
                :geojson="circonscriptions"
                :options="optionsCirconscriptions"
                :options-style="styleCirc"
            />
            <l-geo-json
                :geojson="path"
                :options-style="stylePath"
            />
            <l-marker
                :lat-lng="location"
            />
        </l-map>
    </div>
</template>

<script>
    import { mapGetters } from "vuex";
    import {LMap, LTileLayer, LMarker, LGeoJson} from 'vue2-leaflet';
    import L from 'leaflet';
    import icons from "leaflet-color-number-markers"
    import 'leaflet/dist/leaflet.css';
    import { getPanneaux, getOptimizedPath } from '@/services/api/panneaux'
    import { getCirconscriptions } from '@/services/api/circonscriptions'

    import { Infos, GlobalInfos } from "@/components"

    import {
        UPDATE_CURRENT_POSITION,
        UPDATE_CIRCONSCRIPTION,
        UPDATE_DEPARTEMENT
    } from "@/store/actions.type";

    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
        iconRetinaUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
        shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    });

    var greenIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    var redIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });


    export default {
        name: "Map",
        components: {
            LMap,
            LTileLayer,
            LMarker,
            LGeoJson,
            Infos,
            GlobalInfos
        },
        computed : {
            ...mapGetters([
                "radius",
                "circonscription",
                "departement",
                "optimizedPath",
                "refreshPoints"
            ]),
            optionsCirconscriptions() {
                return {
                    onEachFeature : (feature, layer) => {
                        layer.on('click', () => {
                            this.getPanneaux(feature.properties.code_dpt, feature.properties.num_circ)
                        });
                    }
                }
            },
            optionsPanneaux() {
                return {
                    onEachFeature :(feature, layer) => {
                        layer.on("click", () => {
                            const content = `
                                <div>
                                    <p>Adresse : ${feature.properties.titre === "0" ? "Adresse non disponible" : feature.properties.titre}</p>
                                    <p>${feature.properties.marked ? "Panneau collé" : "Panneau non collé"}<p>
                                </div>
                            `

                            layer.bindPopup(content)
                            this.pointInfos = feature.properties
                            this.showInfos = true
                        })
                    },
                    pointToLayer : (feature, latlng) => {
                        if(feature.properties.marked)
                        {
                            if(feature.properties.ordre)
                                return new L.Marker(latlng, { icon : icons.green.numbers[feature.properties.ordre] })
                            else
                                return new L.Marker(latlng, { icon : greenIcon })
                        }
                        else{
                            if(feature.properties.ordre)
                                return new L.Marker(latlng, { icon : icons.red.numbers[feature.properties.ordre] })
                            else
                                return new L.Marker(latlng, { icon : redIcon })
                        }
                    }
                }
            },
            stylePath() 
            {
                return {
                    weight: 2,
                    color: "black",
                };
            },
            styleCirc() {
                return {
                    weight: 3,
                    color: "blue",
                    fillColor : "white"
                };
            },
            isPointInfosFull() {
                return Object.keys(this.pointInfos).length !== 0
            }
        },
        data() {
            return {
                url: 'https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW1pZ25pYXUiLCJhIjoiY2wyb2cxbHgxMWphYTNlbDEzcTN0YzFiaCJ9.9rjrwcyVVoAuVmbsIv3Sdw',
                attribution: '<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                zoom: 9,
                location : L.latLng(47.478419, -0.563166),
                map : null,
                center : [47.478419, -0.563166],
                panneaux : null,
                circonscriptions : null,
                path : null,
                showInfos: false,
                pointInfos: {},
                circle: null
            };
        },
        methods : {
            async load()
            {
                const tmpDepartement = 49

                this.map = this.$refs.map.mapObject
                this.goToCurrentPos();
                this.getCirconscriptions(tmpDepartement);

                await this.$store.dispatch(UPDATE_DEPARTEMENT, {
                    departement: tmpDepartement
                })
            },
            goToCurrentPos()
            {
                if(("geolocation" in navigator)) {
                    this.gettingLocation = true;
                    navigator.geolocation.getCurrentPosition(pos => {
                        this.location = L.latLng(pos.coords.latitude, pos.coords.longitude)
                        this.center = [ pos.coords.latitude,pos.coords.longitude]

                        this.$store.dispatch(UPDATE_CURRENT_POSITION, {
                            currentPosition: [
                                pos.coords.latitude,
                                pos.coords.longitude
                            ]
                        })
                    })
                }
            },
            async getPanneaux(departement, circonscriptions)
            {
                this.path = null

                await this.$store.dispatch(UPDATE_CIRCONSCRIPTION, {
                    circonscription: circonscriptions
                })
                await this.$store.dispatch(UPDATE_DEPARTEMENT, {
                    departement: departement
                })

                const req = await getPanneaux(departement, circonscriptions);
                req.json().then((data) => {
                    this.panneaux = data
                })
            },
            async getCirconscriptions(departement = null)
            {
                const req = await getCirconscriptions(departement);
                req.json().then((data) => {
                    this.circonscriptions = data
                })
            },
            async getPath(latitude, longitude, radius, departement, circonscription)
            {
                const req = await getOptimizedPath(latitude, longitude, radius, departement, circonscription);
                req.json().then((data) => {
                    this.path = data.path
                    this.panneaux = data.point
                    // Fit de la carte sur le chemin
                    let geoJson = L.geoJson(data.path)
                    this.map.fitBounds(geoJson.getBounds())
                })
            },
            handleClose() {
                this.pointInfos = {}
                this.showInfos = false
            },
            switchMarked() {
                this.panneaux.features = this.panneaux.features.map(e => {
                    if(e.properties.id == this.pointInfos.id)
                        e.properties.marked = !e.properties.marked
                    return e
                })
            }
        },
        watch: {
            optimizedPath: function(fetchedData) {
                this.path = fetchedData.path
                this.panneaux = fetchedData.point
                // Fit de la carte sur le chemin
                let geoJson = L.geoJson(fetchedData)
                this.map.fitBounds(geoJson.getBounds())
            },
            radius: function() {
                if (this.circle !== null && this.map.hasLayer(this.circle)) {
                    this.map.removeLayer(this.circle)
                }

                this.circle = L.circle(
                    this.location,
                    this.radius * 1000,
                    {
                        color: 'red',
                        fillColor: 'red',
                        fillOpacity: 0.1,
                    }
                ).addTo(this.map);
            },
            refreshPoints: async function() {
                const req = await getPanneaux(this.departement, this.circonscription);
                this.panneaux = await req.json().then((data) => {
                    return data
                })
            }
        }
    };
</script>

<style lang="scss" scoped>
@import "./Map.style";
</style>
