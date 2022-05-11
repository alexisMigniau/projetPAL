<template>
    <div class="footer">
        <p>Alexis MIGNIAU & Alexis GREGOIRE</p>
        <p>PAL : Panneaux d'Affichage Libre</p>
        <p>M2 ACDI, Faculté des sciences, Angers (49)</p>
    </div>
</template>

<script>
export default {
    name: "Footer",
    computed: {
        showFooter() {
            return !this.isMobileDevice
        }
    }
};
</script>

<style lang="scss" scoped>
    @import "./Footer.style";
</style>
