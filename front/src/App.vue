<template>
    <v-app id="app">
        <v-container fluid class="main-container">
            <l-map ref="map" style="height: 800px" :zoom="zoom" :center="center" @ready="load()">
                <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
                <l-geo-json
                    :geojson="geojson"
                    :options="options"
                    :options-style="styleFunction"
                />
                <l-marker :lat-lng="location"/>
            </l-map>
        </v-container>
    </v-app>
</template>

<script>
    import {LMap, LTileLayer, LMarker, LGeoJson} from 'vue2-leaflet';
    import { Icon, latLng } from 'leaflet';
    import 'leaflet/dist/leaflet.css';
    import { getAllPanneaux } from './services/api/panneaux'

    delete Icon.Default.prototype._getIconUrl;
    Icon.Default.mergeOptions({
        iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
        iconUrl: require('leaflet/dist/images/marker-icon.png'),
        shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    });

    export default {
        name: "App",
        components: {
            LMap,
            LTileLayer,
            LMarker,
            LGeoJson
        },
        data() {
            return {
                url: 'https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW1pZ25pYXUiLCJhIjoiY2wyb2cxbHgxMWphYTNlbDEzcTN0YzFiaCJ9.9rjrwcyVVoAuVmbsIv3Sdw',
                attribution: '<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                zoom: 9,
                location : latLng(47.478419, -0.563166),
                map : null,
                center : [47.478419, -0.563166],
                geojson : null
            };
        },
        methods : {
            load()
            {
                this.map = this.$refs.map.mapObject
                this.goToCurrentPos();
                this.getAll();
            },
            goToCurrentPos()
            {
                if(("geolocation" in navigator)) {
                    this.gettingLocation = true;
                    navigator.geolocation.getCurrentPosition(pos => {
                        this.location = latLng(pos.coords.latitude, pos.coords.longitude)
                        this.center = [ pos.coords.latitude,pos.coords.longitude]
                        this.zoom = 15
                    })
                }
            },
            async getAll()
            {
                const req = await getAllPanneaux();
                await req.json().then((data) => {
                   this.geojson = data
                })
            }
        },
    };
</script>

<style lang="scss">
    @import "./styles/globals.scss";
</style>
