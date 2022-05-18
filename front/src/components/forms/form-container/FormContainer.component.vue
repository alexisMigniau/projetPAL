<template>
    <div class="formContainer">
        <div class="formContainer__header"
            v-if="formToDisplay === 'search'"
        >
            <img src="../../../assets/icons/search.svg" alt="Search"/>
            <p>Optimiser mon parcours</p>
        </div>
        <div class="formContainer__header"
            v-if="formToDisplay === 'add'"
        >
            <img src="../../../assets/icons/add.svg" alt="Add"/>
            <p>Ajouter un panneau</p>
        </div>
        <div class="formContainer__divider"></div>
        <div class="formContainer__body"></div>
    </div>
</template>

<script>
export default {
    name: "FormContainer",
    props: ["formToDisplay"],
    data: () => ({

    }),
    methods: {},
    computed: {}
};
</script>

<style lang="scss" scoped>
    @import "./FormContainer.style";
</style>
