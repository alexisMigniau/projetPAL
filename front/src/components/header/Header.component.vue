<template>
    <div class="header" v-on:click="() => displayOurNames()">
        <img src="../../assets/icons/pin-solid.svg" alt="Pin"/>
        <span>Panneaux d'Affichage Libre</span>
    </div>
</template>

<script>
export default {
    name: "Header",
    props: ["isMobileDevice"],
    methods: {
        displayOurNames() {
            alert("Application réalisée par Alexis GREGOIRE et Alexis MIGNIAU, étudiants en M2 Informatique (ACDI) à Angers.")
        }
    }
};
</script>

<style lang="scss" scoped>
    @import "./Header.style";
</style>
