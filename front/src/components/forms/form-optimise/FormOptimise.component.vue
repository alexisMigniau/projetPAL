<template>
    <div class="formOptimise">
        <p>Veuillez sélectionner un cercle autour de votre position actuelle.</p>
        <v-form class="form" ref="form">
            <v-slider
                class="slider"
                label="Rayon (km)"
                max="20"
                min="0.1"
                step="0.1"
                v-model="radius"
                thumb-label
                prepend-icon="mdi-radius-outline"
                :hint="hint"
                persistent-hint
            ></v-slider>
            <v-text-field
                class="textfield"
                v-model="radius"
                append-icon="mdi-radius-outline"
                label="Rayon (km)"
                min="0"
                max="20"
                outlined
                required
            ></v-text-field>
            <v-btn
                class="button"
                color="primary"
                @click="submit"
            >
                Rechercher
            </v-btn>
            <p v-if="message !== '' && !error" class="message">{{message}}</p>
            <p v-if="message !== '' && error" class="message err">{{message}}</p>
        </v-form>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getOptimizedPath } from '@/services/api/panneaux'
import {
    UPDATE_OPTIMIZED_PATH,
    UPDATE_RADIUS
} from "@/store/actions.type";

export default {
    name: "FormOptimise",
    props: ["dataForOptimization"],
    data: () => ({
        radius: "4",
        result: null,
        message: "",
        error: false,
    }),
    computed: {
        ...mapGetters([
            "optimizedPath"
        ]),
        hint() {
            return this.radius + " km"
        }
    },
    methods: {
        resetMessageAfterDelay(delay = 3000) {
            setTimeout(() => {
                this.message = ""
            }, delay)
        },
        async submit() {
            if (this.radius > 0 && this.radius <= 20) {
                this.dataForOptimization.radius = this.radius

                const req = await getOptimizedPath(
                    this.dataForOptimization.latitude,
                    this.dataForOptimization.longitude,
                    this.dataForOptimization.radius,
                    this.dataForOptimization.departement,
                    this.dataForOptimization.circonscription
                );
                req.json().then((data) => {
                    this.result = data
                })

                if (req.status === 200) {
                    await this.$store.dispatch(UPDATE_OPTIMIZED_PATH, {
                        optimizedPath: this.result
                    })
                    this.error = false
                    this.message = "Un parcours a été trouvé !"
                    this.resetMessageAfterDelay()
                } else {
                    this.error = true
                    this.message = "Une erreur est survenue. Veillez à sélectionner une circonscription en cliquant dessus."
                    this.resetMessageAfterDelay()
                }
            } else {
                alert("Veuillez sélectionner un rayon entre 1 et 50 km.")
            }
        }
    },
    watch: {
        optimized: function(newValue) {
            this.optimizedPath = newValue
        },
        radius: function() {
            this.$store.dispatch(UPDATE_RADIUS, {
                radius: this.radius
            })
        }
    }
};
</script>

<style lang="scss" scoped>
    @import "./FormOptimise.style";
</style>
