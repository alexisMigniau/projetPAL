<template>
    <div
        class="footer"
        v-bind:class="{ footer_mobile: isMobileDevice }"
    >
        <p>Alexis MIGNIAU & Alexis GREGOIRE</p>
        <p>PAL : Panneaux d'Affichage Libre</p>
        <p>M2 ACDI, Faculté des sciences, Angers (49)</p>
    </div>
</template>

<script>
export default {
    name: "Footer",
    props: ["isMobileDevice"]
};
</script>

<style lang="scss" scoped>
    @import "./Footer.style";
</style>
