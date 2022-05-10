<template>
    <v-app>
        <Header :v-bind:isMobileDevice="isMobileDevice"/>
        <Forms :v-bind:isMobileDevice="isMobileDevice"/>
        <Map />
        <Footer :v-bind:isMobileDevice="isMobileDevice"/>
    </v-app>
</template>

<script>
import { Footer, Forms, Header, Map } from "@/components";

import isMobileDevice from "@/helpers/device"

export default {
    name: "App",
    components: {
        Footer,
        Forms,
        Header,
        Map
    },
    data: () => ({
        isMobileDevice: isMobileDevice()
    }),
    methods : {}
};
</script>

<style lang="scss">
    @import "./styles/globals.scss";
</style>
