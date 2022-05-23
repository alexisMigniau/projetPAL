<template>
    <div class="infos">
        <a :href="gmapUrl" target="_blank" class="infos__link">
            <p class="infos__title">{{ getTitle }}</p>
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
            <div class="infos__markContainer__state infos__markContainer__state_marked">
                <img src="../../assets/icons/free.png" alt="Drapeau collé"/>
                <p>Panneau collé</p>
            </div>
            <p class="infos__markContainer__instruction">
                Cliquez ici pour décoller ce panneau
            </p>
        </div>
        <div
            v-else
            class="infos__markContainer"
            v-on:click="switchMark"
        >
            <div class="infos__markContainer__state infos__markContainer__state_free">
                <img src="../../assets/icons/marked.png" alt="Drapeau non collé"/>
                <p>Panneau non collé</p>
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
        <span class="pointId">ID: #{{id}}</span>
    </div>
</template>

<script>
import { updatePanneau } from '@/services/api/panneaux'

export default {
    name: "Infos",
    props: ["title", "marked", "id"],
    computed: {
        gmapUrl() {
            return this.title === "0"
                ? null
                : "https://www.google.fr/maps/place/" + this.title.split(" ").join("+")
        },
        getTitle() {
            return this.title === "0"
                ? "Adresse non disponible"
                : this.title
        }
    },
    methods: {
        close() {
            this.$emit('close')
        },
        async switchMark() {
            await updatePanneau(this.id, !this.marked)
            this.$emit('change')
        }
    }
};
</script>

<style lang="scss" scoped>
    @import "./Infos.style";
</style>
