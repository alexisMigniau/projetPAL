<template>
    <v-app class="app">
        <Header />
        <Forms
            :dataForOptimization="dataForOptimization"
            :optimizedPath="optimizedPath"
        />
        <Map 
            :dataForOptimization="dataForOptimization"
            :optimizedPath="optimizedPath"
        />
        <Footer />
    </v-app>
</template>

<script>
import { Footer, Forms, Header, Map } from "@/components";

export default {
    name: "App",
    components: {
        Footer,
        Forms,
        Header,
        Map
    },
    data: () => ({
        dataForOptimization: {},
        optimizedPath: {}
    })
};
</script>

<style lang="scss">
    @import "./styles/globals.scss";
</style>
