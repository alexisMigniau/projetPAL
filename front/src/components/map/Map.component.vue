<template>
    <div class="map">
        <div v-if="showInfos" class="infoPoint">
            <h1>TEST</h1>
        </div>
        <l-map ref="map" :zoom="zoom" :center="center" @ready="load()">
            <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
            <l-geo-json
                :geojson="panneaux"
                :options="optionsPanneaux"
            />
            <l-geo-json
                :geojson="circonscriptions"
                :options="optionsCirconscriptions"
            />
            <l-marker :lat-lng="location"/>
        </l-map>
    </div>
</template>

<script>
    import {LMap, LTileLayer, LMarker, LGeoJson} from 'vue2-leaflet';
    import { Icon, latLng } from 'leaflet';
    import 'leaflet/dist/leaflet.css';
    import { getPanneaux } from '@/services/api/panneaux'
    import { getCirconscriptions } from '@/services/api/circonscriptions'

    import isMobileDevice from "@/helpers/device"

    delete Icon.Default.prototype._getIconUrl;
    Icon.Default.mergeOptions({
        iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
        iconUrl: require('leaflet/dist/images/marker-icon.png'),
        shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    });

    export default {
        name: "Map",
        components: {
            LMap,
            LTileLayer,
            LMarker,
            LGeoJson
        },
        props: ["isMobileDevice"],
        computed : {
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
                        const content = `
                        <div>
                            <p>Adresse : ${feature.properties.titre}</p>
                            <p>Collé : ${feature.properties.marked ? "Oui" : "Non"}<p>
                        </div>`

                        if(!isMobileDevice())
                            layer.bindPopup(content)
                    }
                }
            },
            showInfos() {
                return isMobileDevice()
            }
        },
        data() {
            return {
                url: 'https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW1pZ25pYXUiLCJhIjoiY2wyb2cxbHgxMWphYTNlbDEzcTN0YzFiaCJ9.9rjrwcyVVoAuVmbsIv3Sdw',
                attribution: '<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                zoom: 9,
                location : latLng(47.478419, -0.563166),
                map : null,
                center : [47.478419, -0.563166],
                panneaux : null,
                circonscriptions : null
            };
        },
        methods : {
            load()
            {
                this.map = this.$refs.map.mapObject
                this.goToCurrentPos();
                this.getCirconscriptions(49);
            },
            goToCurrentPos()
            {
                if(("geolocation" in navigator)) {
                    this.gettingLocation = true;
                    navigator.geolocation.getCurrentPosition(pos => {
                        this.location = latLng(pos.coords.latitude, pos.coords.longitude)
                        this.center = [ pos.coords.latitude,pos.coords.longitude]
                    })
                }
            },
            async getPanneaux(departement, circonscriptions)
            {
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
            }
        },
    };
</script>

<style lang="scss" scoped>
@import "./Map.style";
</style>
