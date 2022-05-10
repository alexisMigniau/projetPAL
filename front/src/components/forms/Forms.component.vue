<template>
    <div
        class="forms"
        v-bind:class="{ forms_mobile: isMobileDevice }"
    >
        <div class="forms__buttons">
            <div class="forms__buttons__btn">
                <img src="../../assets/icons/search.svg" alt="Search"/>
            </div>
            <div class="forms__buttons__btn">
                <img src="../../assets/icons/add.svg" alt="Add"/>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Forms",
    props: ["isMobileDevice"]
};
</script>

<style lang="scss" scoped>
    @import "./Forms.style";
</style>
