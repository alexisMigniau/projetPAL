<template>
    <div class="container">
        <div class="body">
            <h1>{{ $t("LOGIN_TITLE") }}</h1>
            <v-form ref="form" v-model="valid">
                <v-text-field
                    :label="$t('LOGIN_ID')"
                    v-model="username"
                    :rules="requiredRule(this.$t('LOGIN_RULE_ID_REQUIRED'))"
                    outlined
                    required
                ></v-text-field>

                <v-text-field
                    v-model="password"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="
                        requiredRule(this.$t('LOGIN_RULE_PASSWORD_REQUIRED'))
                    "
                    :type="showPassword ? 'text' : 'password'"
                    :label="$t('LOGIN_PASSWORD')"
                    @click:append="showPassword = !showPassword"
                    outlined
                    required
                ></v-text-field>
                <div class="center">
                    <p
                        class="displayError"
                        v-if="displayMessage !== ''"
                        v-html="displayMessage"
                    />
                </div>
                <div class="center">
                    <v-btn class="button" :disabled="!valid" @click="validate">
                        {{ $t("LOGIN_LOGIN_BUTTON") }}
                    </v-btn>
                </div>

                <div class="center">
                    <a class="redirectionButton" @click="redirect('Register')">
                        {{ $t("LOGIN_REGISTER_REDIRECTION_BUTTON") }}
                    </a>
                </div>
            </v-form>
        </div>
    </div>
</template>

<script>
import { login, getUser } from "@/services/api/users.js";
import { LOGIN } from "@/store/actions.type";

export default {
    data: () => ({
        valid: false,
        password: "",
        username: "",
        showPassword: false,
        displayMessage: "",
    }),

    methods: {
        requiredRule(msg) {
            return [(v) => !!v || msg];
        },
        redirect(viewName) {
            this.$router.push({ name: viewName });
        },
        deleteMessage() {
            setTimeout(() => {
                this.displayMessage = "";
            }, 3000);
        },
        async validate() {
            const user = {
                username: this.username,
                password: this.password,
            };

            const userReq = await login(user);
            let userRes;

            switch (userReq.status) {
                case 200:
                    userRes = await userReq.json().then((data) => {
                        return data;
                    });

                    await this.$store.dispatch(LOGIN, {
                        token: userRes.token,
                        user: userRes,
                    });

                    this.deleteMessage();
                    break;
                case 400:
                    this.displayMessage = this.$t("LOGIN_CONNECTION_FAILED");
                    this.deleteMessage();
                    return;
                default:
                    this.displayMessage = this.$t("LOGIN_ERROR_OCCURRED");
                    this.deleteMessage();
                    return;
            }

            const userRightReq = await getUser();
            let userRightRes;
            switch (userRightReq.status) {
                case 200:
                    userRightRes = await userRightReq.json().then((data) => {
                        return data;
                    });

                    await this.$store.dispatch(LOGIN, {
                        token: userRes.token,
                        user: userRightRes,
                    });

                    this.redirect("Home");
                    break;
                case 400:
                    this.displayMessage = this.$t("LOGIN_CONNECTION_FAILED");
                    return;
                default:
                    this.displayMessage = this.$t("LOGIN_ERROR_OCCURRED");
                    return;
            }
        },
    },
};
</script>

<style lang="scss" scoped>
@import "Login.style";
</style>
