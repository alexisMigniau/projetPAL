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
                <v-icon x-large class="title__icon">mdi-account</v-icon>
                <h1>{{ $t("PROFILE_KEYWORD") }} : {{ user.username }}</h1>
            </div>
        </div>
        <div class="page__body box">
            <div class="box__title">
                <h2>{{ $t("PROFILE_EDIT_INFOS") }}</h2>
            </div>
            <v-form ref="form" class="box__body fields" v-model="valid">
                <v-text-field
                    class="field-username"
                    :label="$t('REGISTER_ID')"
                    v-model="username"
                    :rules="usernameRules($t('PROFILE_RULE_ID_LENGTH'))"
                    dense
                    outlined
                ></v-text-field>
                <v-text-field
                    class="field-password"
                    type="password"
                    v-model="password"
                    :label="$t('PROFILE_PASSWORD')"
                    dense
                    outlined
                ></v-text-field>
                <v-text-field
                    class="field-confirmPassword"
                    type="password"
                    v-model="confirmPassword"
                    :label="$t('PROFILE_CONFIRM_PASSWORD')"
                    :error-messages="passwordMatchError()"
                    dense
                    outlined
                ></v-text-field>
                <v-btn
                    class="validButton"
                    large
                    :disabled="
                        !valid || (this.username === '' && this.password === '')
                    "
                    @click="validate"
                >
                    <v-icon>mdi-content-save</v-icon>&nbsp;
                    {{ $t("PROFILE_SAVE_BUTTON") }}
                </v-btn>
                <p
                    v-if="displayMessage !== ''"
                    :class="[
                        'displayMessage',
                        !error ? 'displaySuccess' : 'displayError',
                    ]"
                >
                    {{ displayMessage }}
                </p>
            </v-form>
        </div>
        <div class="page__body box rightsBox">
            <div class="box__title box__title--readOnly">
                <h2>{{ $t("PROFILE_MY_RIGHTS") }}</h2>
            </div>
            <div class="box__body rightsTable">
                <table class="rights">
                    <thead>
                        <tr>
                            <td>{{ $t("PROFILE_FORMATION") }}</td>
                            <td>{{ $t("PROFILE_COURSE") }}</td>
                        </tr>
                    </thead>

                    <tr :key="item.formation" v-for="item in getRights()">
                        <td>{{ item.formation }}</td>
                        <td>{{ item.course }}</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
import { updateUser } from "../../services/api/users";
import { LOGIN } from "../../store/actions.type";

export default {
    name: "Profile",

    data: () => ({
        valid: false,
        name: "",
        username: "",
        password: "",
        confirmPassword: "",
        displayMessage: "",
        error: false,
    }),
    computed: {
        ...mapGetters(["user"]),
    },
    methods: {
        redirectHome() {
            this.$router.push({ name: "Home" });
        },
        usernameRules(message) {
            return [
                (v) => v === "" || (v.length >= 2 && v.length <= 15) || message,
            ];
        },
        passwordMatchError() {
            return this.password === this.confirmPassword
                ? ""
                : this.$t("PROFILE_RULE_CONFIRM_PASSWORD");
        },
        getRights() {
            let result = [];
            for (let right in this.user.rights) {
                for (let course in this.user.rights[right]) {
                    result.push({
                        formation: right,
                        course: this.user.rights[right][course].name,
                    });
                }
            }
            return result;
        },
        deleteMessage() {
            setTimeout(() => {
                this.displayMessage = "";
            }, 3000);
        },
        async validate() {
            const user = {};

            if (this.username !== "") {
                user.username = this.username;
            }

            if (this.password !== "") {
                user.password = this.password;
            }

            if (this.username === "" && this.password === "") {
                return;
            }

            const req = await updateUser(user);
            let res;

            switch (req.status) {
                case 200:
                    res = await req.json().then((data) => {
                        return data;
                    });

                    await this.$store.dispatch(LOGIN, {
                        token: res.token,
                        user: res,
                    });

                    this.displayMessage = this.$t("PROFILE_UPDATE_SUCCESS");
                    this.error = false;
                    this.deleteMessage();
                    break;
                case 409:
                    this.displayMessage = this.$t("PROFILE_USERNAME_TAKEN");
                    this.error = true;
                    this.deleteMessage();
                    break;
                default:
                    this.displayMessage = this.$t("PROFILE_ERROR_OCCURED");
                    this.error = true;
                    this.deleteMessage();
            }
        },
    },
};
</script>
<style scoped lang="scss">
@import "Profile.style";
</style>
