<template>
    <div class="forms">
        <div
            class="forms__panel"
            v-bind:class="{ forms__panel_hidden: doDisplayFormPanel }"
        >
            <div
                class="forms__panel__close"
                v-on:click="setDisplayedForm('')"
            >
                <img src="../../assets/icons/cross.svg" alt="Close"/>
            </div>
        </div>
        <div class="forms__buttons">
            <div
                class="forms__buttons__btn"
                v-bind:class="{ forms__buttons__btn_selected: isSelected('search') }"
                v-on:click="setDisplayedForm('search')"
            >
                <img src="../../assets/icons/search.svg" alt="Search"/>
            </div>
            <div
                class="forms__buttons__btn"
                v-bind:class="{ forms__buttons__btn_selected: isSelected('add') }"
                v-on:click="setDisplayedForm('add')"
            >
                <img src="../../assets/icons/add.svg" alt="Add"/>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Forms",
    props: ["isMobileDevice"],
    data: () => ({
        displayedForm: ""
    }),
    methods: {
        setDisplayedForm(form) {
            this.displayedForm = form
        },
        isSelected(form) {
            return this.displayedForm === form
        }
    },
    computed: {
        doDisplayFormPanel() {
            return this.displayedForm.length === 0
        }
    }
};
</script>

<style lang="scss" scoped>
    @import "./Forms.style";
</style>
