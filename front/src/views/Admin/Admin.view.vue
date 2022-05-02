<template>
    <div class="page">
        <div class="page__header">
            <button
                class="page__header__homeBtn"
                @click="redirectHome('Home')"
                text
            >
                <i class="fas fa-home"></i>
                {{ $t("BTN_REDIRECT_HOME") }}
            </button>
            <div class="page__header__title">
                <v-icon x-large class="title__icon">mdi-key-variant</v-icon>
                <h1>{{ this.$t("ADMIN_TITLE") }}</h1>
            </div>
        </div>
        <div class="page__body">
            <AddRights @clicked="refreshRights" />
            <RemoveRights :key="removeRightsKey" />
        </div>
    </div>
</template>

<script>
import AddRights from "@/components/rights/add-rights/AddRights.component.vue";
import RemoveRights from "@/components/rights/remove-rights/RemoveRights.component.vue";

export default {
    components: {
        AddRights,
        RemoveRights,
    },
    data() {
        return {
            removeRightsKey: 0,
        };
    },
    methods: {
        redirectHome() {
            this.$router.push({ name: "Home" });
        },
        refreshRights(value) {
            if (value === "refreshRights") {
                this.removeRightsKey++;
            }
        },
    },
};
</script>

<style lang="scss">
@import "Admin.style";
</style>
