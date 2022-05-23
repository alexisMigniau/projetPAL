<template>
    <div class="globalInfos">
        <p class="globalInfos__departement">
            Département : <span>{{departement}}</span>
        </p>
        <hr>
        <p v-if="circonscription !== null" class="globalInfos__circonscription">
            Circonscription : <span>{{circonscription}}</span>
        </p>
        <p v-else class="globalInfos__circonscription">
            Vous n'avez pas encore sélectionné de circonscription.
        </p>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: "GlobalInfos",
    computed: {
        ...mapGetters([
            "circonscription",
            "departement"
        ])
    },
};
</script>

<style lang="scss" scoped>
    @import "./GlobalInfos.style";
</style>
