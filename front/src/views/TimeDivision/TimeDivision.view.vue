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
                <v-icon x-large class="title__icon"
                    >mdi-clock-time-four-outline</v-icon
                >
                <h1>{{ $t("TIME_DIVISION_TITLE") }}</h1>
            </div>
            <p class="selectedCourse">
                {{ $t("TIME_DIVISION_SELECTED_COURSE") }}
                <span class="selectedCourse__course">
                    {{ this.course.name }} ({{ this.formation }})
                </span>
            </p>
        </div>
        <div class="page__body sections">
            <div class="timeDivisionManagement">
                <TimeDivisionManagement />
            </div>
            <div class="groupDistribution">
                <GroupDistribution />
            </div>
        </div>
    </div>
</template>
<script>
import TimeDivisionManagement from "../../components/time-division/TimeDivisionManagement/TimeDivisionManagement.component.vue";
import GroupDistribution from "../../components/time-division/GroupDistribution/GroupDistribution.component.vue";
import { mapGetters } from "vuex";

export default {
    name: "Profile",
    components: {
        TimeDivisionManagement,
        GroupDistribution,
    },
    computed: {
        ...mapGetters(["formation", "course"]),
    },
    methods: {
        redirectHome() {
            this.$router.push({ name: "Home" });
        },
    },
};
</script>
<style lang="scss" scoped>
@import "TimeDivision.style";
</style>
