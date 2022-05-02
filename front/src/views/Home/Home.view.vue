<template>
    <div class="body">
        <div v-if="isUserConnected && userHasEditRights">
            <div class="course--select--container">
                <CourseSelect />
            </div>
            <div
                v-if="isCourseSelected && !this.trigger"
                class="triggerList--container"
            >
                <TriggerList />
            </div>
            <div v-if="this.trigger && this.course" class="edition--container">
                <Edition />
            </div>
        </div>
        <div
            v-else-if="this.user != null && !userHasEditRights"
            class="no-rights"
        >
            <h1>{{ $t("HOME_NO_EDIT_RIGHT") }}</h1>
        </div>
        <div v-else class="not-logged-in">
            <h1>{{ $t("HOME_WELCOME") }}</h1>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import CourseSelect from "@/components/course-select/CourseSelect.component";
import TriggerList from "@/components/trigger-search/trigger-list/TriggerList.component";
import { constraints } from "@/components/constraints/Constraints.component";
import Edition from "@/components/trigger-edition/edition/Edition.component";

export default {
    name: "Home",
    components: { Edition, CourseSelect, TriggerList },
    data: () => ({
        constraints: constraints,
    }),
    computed: {
        ...mapGetters([
            "authentication",
            "user",
            "formation",
            "course",
            "trigger",
        ]),
        isUserConnected() {
            return this.authentication;
        },
        userHasEditRights() {
            return Object.keys(this.user.rights).length > 0;
        },
        isCourseSelected() {
            return this.course;
        },
    },
};
</script>

<style lang="scss" scoped>
@import "Home.style";
</style>
