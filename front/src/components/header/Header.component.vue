<template>
    <div
        class="header"
        v-bind:class="{ header_mobile: isMobileDevice }"
    >
        <img src="../../assets/icons/pin-solid.svg" alt="Pin"/>
        <span>Panneaux d'Affichage Libre</span>
    </div>
</template>

<script>
export default {
    name: "Header",
    props: ["isMobileDevice"],
};
</script>

<style lang="scss" scoped>
    @import "./Header.style";
</style>
