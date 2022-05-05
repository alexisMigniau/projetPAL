<template>
    <v-app id="app">
        <v-container fluid class="main-container">
            <l-map ref="map" style="height: 800px" :zoom="zoom" :center="center" @ready="load()">
                <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
            </l-map>
        </v-container>
    </v-app>
</template>

<script>
    import {LMap, LTileLayer} from 'vue2-leaflet';
    import { Icon } from 'leaflet';
    import 'leaflet/dist/leaflet.css';

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
        },
        data() {
            return {
                url: 'https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW1pZ25pYXUiLCJhIjoiY2wyb2cxbHgxMWphYTNlbDEzcTN0YzFiaCJ9.9rjrwcyVVoAuVmbsIv3Sdw',
                attribution: '<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                zoom: 9,
                location : null,
                map : null,
                center : [47.478419, -0.563166]
            };
        },
        methods : {
            load()
            {
                this.map = this.$refs.map.mapObject
                this.goToCurrentPos();
            },
            goToCurrentPos()
            {
                if(("geolocation" in navigator)) {
                    this.gettingLocation = true;
                    navigator.geolocation.getCurrentPosition(pos => {
                        this.center = [ pos.coords.latitude,pos.coords.longitude]
                        this.zoom = 15
                    })
                }
            }
        },
    };
</script>

<style lang="scss">
    @import "./styles/globals.scss";
</style>
