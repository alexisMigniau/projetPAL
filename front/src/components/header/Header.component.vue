<template>
    <div class="header">
        <img src="../../assets/icons/pin-solid.svg" alt="Pin"/>
        <span>Panneaux d'Affichage Libre</span>
    </div>
</template>

<script>
export default {
    name: "Header",
    props: ["isMobileDevice"]
};
</script>

<style lang="scss" scoped>
    @import "./Header.style";
</style>
