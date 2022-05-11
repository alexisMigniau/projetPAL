<template>
    <div class="infos">
        <a :href="gmapUrl" target="_blank" class="infos__link">
            <p class="infos__title">{{ title }}</p>
            <img
                src="../../assets/icons/google-maps.svg"
                alt="Go to Google Maps"
                class="gmapBtn"
            >
        </a>
        <div
            v-if="marked"
            class="infos__markContainer infos__markContainer_marked"
            v-on:click="switchMark"
        >
            <div class="infos__markContainer__state">
                <img src="../../assets/icons/marked.png" alt="Drapeau collé"/>
                <p>Collé</p>
            </div>
            <p class="infos__markContainer__instruction">
                Cliquez ici pour décoller ce panneau
            </p>
        </div>
        <div
            v-else
            class="infos__markContainer infos__markContainer_free"
            v-on:click="switchMark"
        >
            <div class="infos__markContainer__state">
                <img src="../../assets/icons/free.png" alt="Drapeau non collé"/>
                <p>Non collé</p>
            </div>
            <p class="infos__markContainer__instruction">
                Cliquez ici pour coller ce panneau
            </p>
        </div>
        <div
            class="close"
            v-on:click="close()"
        >
            <img src="../../assets/icons/cross.svg" alt="Close"/>
        </div>
    </div>
</template>

<script>
export default {
    name: "Infos",
    props: ["title", "marked"],
    computed: {
        gmapUrl() {
            return "https://www.google.fr/maps/place/" + this.title.split(" ").join("+")
        }
    },
    methods: {
        close() {
            this.$emit('close')
        },
        //tmp
        switchMark() {
            this.marked = !this.marked
        }
    }
};
</script>

<style lang="scss" scoped>
    @import "./Infos.style";
</style>
