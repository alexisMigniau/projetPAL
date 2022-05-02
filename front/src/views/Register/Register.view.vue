<template>
    <div class="container">
        <div class="body">
            <h1>{{ $t("REGISTER_TITLE") }}</h1>
            <v-form ref="form" v-model="valid">
                <v-text-field
                    :label="$t('REGISTER_ID')"
                    v-model="username"
                    :rules="
                        usernameRules(
                            $t('REGISTER_RULE_ID_REQUIRED'),
                            $t('REGISTER_RULE_ID_LENGTH')
                        )
                    "
                    outlined
                    required
                ></v-text-field>

                <v-text-field
                    v-model="password"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPassword ? 'text' : 'password'"
                    @click:append="showPassword = !showPassword"
                    :rules="requiredRule($t('REGISTER_RULE_PASSWORD'))"
                    :label="$t('REGISTER_PASSWORD')"
                    outlined
                    required
                ></v-text-field>

                <v-text-field
                    v-model="confirmPassword"
                    :append-icon="
                        showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'
                    "
                    :type="showConfirmPassword ? 'text' : 'password'"
                    @click:append="showConfirmPassword = !showConfirmPassword"
                    :label="$t('REGISTER_CONFIRM_PASSWORD')"
                    :error-messages="passwordMatchError()"
                    outlined
                    required
                ></v-text-field>

                <div class="center">
                    <p
                        v-bind:class="error ? 'displayError' : 'displaySuccess'"
                        v-if="displayMessage !== ''"
                        v-html="displayMessage"
                    />
                </div>

                <div class="center">
                    <v-btn class="button" :disabled="!valid" @click="validate">
                        {{ $t("REGISTER_CREATE_ACCOUNT") }}
                    </v-btn>
                </div>
            </v-form>
            <div class="center">
                <a class="redirectionButton" @click="redirect('Login')">{{
                    $t("REGISTER_LOGIN_REDIRECTION_BUTTON")
                }}</a>
            </div>
        </div>
    </div>
</template>
<script>
import { register } from "@/services/api/users.js";

export default {
    data: () => ({
        valid: false,
        username: "",
        password: "",
        confirmPassword: "",
        showPassword: false,
        showConfirmPassword: false,
        displayMessage: "",
        error: false,
    }),
    methods: {
        usernameRules(message1, message2) {
            return [
                (value) => !!value || message1,
                (v) => (v && v.length >= 2) || message2,
                (v) => (v && v.length <= 15) || message2,
            ];
        },
        requiredRule(message) {
            return [(value) => !!value || message];
        },
        emailRules(message1, message2) {
            return [
                (value) => !!value || message1,
                (value) => /.+@.+\..+/.test(value) || message2,
            ];
        },
        passwordMatchError() {
            return this.password === this.confirmPassword
                ? ""
                : this.$t("REGISTER_RULE_CONFIRM_PASSWORD");
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
            const data = {
                username: this.username,
                password: this.password,
            };

            const req = await register(data);

            switch (req.status) {
                case 200:
                    this.error = false;
                    this.displayMessage = this.$t("REGISTER_SUCCESS");
                    setTimeout(() => {
                        this.displayMessage = "";
                        this.$router.push({ name: "Login" });
                    }, 3000);

                    break;
                case 409:
                    this.error = true;
                    this.displayMessage = this.$t(
                        "REGISTER_USERNAME_ALREADY_TAKEN"
                    );
                    this.deleteMessage();
                    break;
                default:
                    this.error = true;
                    this.displayMessage = this.$t("REGISTER_ERROR_OCCURRED");
                    this.deleteMessage();
                    break;
            }
        },
    },
};
</script>
<style lang="scss" scoped>
@import "Register.style";
</style>
