<template>
    <div v-if="formToDisplay === 'search'" class="formContainer">
        <div class="formContainer__header">
            <img src="../../../assets/icons/search.svg" alt="Search"/>
            <p>Optimiser mon parcours</p>
        </div>
        <div class="formContainer__divider"></div>
        <FormOptimise
            :dataForOptimization="dataForOptimization"
        />
    </div>
    <div v-else-if="formToDisplay === 'add'" class="formContainer">
        <div class="formContainer__header"
            v-if="formToDisplay === 'add'"
        >
            <img src="../../../assets/icons/add.svg" alt="Add"/>
            <p>Ajouter un panneau</p>
        </div>
        <div class="formContainer__divider"></div>
        <FormAddPoint
            :dataForOptimization="dataForOptimization"
        />
    </div>
</template>

<script>
import FormOptimise from "../form-optimise/FormOptimise.component.vue"
import FormAddPoint from "../form-add-point/FormAddPoint.component.vue"

export default {
    name: "FormContainer",
    props: ["formToDisplay", "dataForOptimization"],
    components: {
        FormOptimise,
        FormAddPoint
    },
    data: () => ({

    }),
    methods: {},
    computed: {}
};
</script>

<style lang="scss" scoped>
    @import "./FormContainer.style";
</style>
