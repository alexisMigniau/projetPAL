<template>
    <div class="formOptimise">
        <p class="circo" v-if="displayCirco">
            Circonscription sélectionnée : <span>{{circonscription}}</span>
        </p>
        <p class="circo circo_err" v-else>Veuillez sélectionner une circonscription en cliquant dessus.</p>
        <p class="advice">Veuillez sélectionner un cercle autour de votre position actuelle (marqueur jaune) pour déterminer le secteur du parcours.</p>
        <v-form class="form" ref="form">
            <v-slider
                class="slider"
                label="Rayon (km)"
                max="20"
                min="0"
                step="0.1"
                v-model="myRadius"
                thumb-label
                prepend-icon="mdi-radius-outline"
            ></v-slider>
            <div class="textfieldContainer">
                <v-text-field
                    class="textfield"
                    v-model="myRadius"
                    outlined
                    required
                    suffix="km"
                    type="number"
                    step="0.1"
                ></v-text-field>
                <p class="warningMsg">Attention: Limite de 25 panneaux</p>
            </div>
            <v-switch
                v-model="goMarked"
                :label="`Parcourir les panneaux marqués ? ${goMarked ? 'Oui' : 'Non'}`"
                class="goMarked"
            ></v-switch>
            <v-btn
                class="button"
                color="primary"
                @click="submit"
                :disabled="disableBtn"
            >
                Rechercher
            </v-btn>
            <p v-if="message !== '' && !error" class="message">{{message}}</p>
            <p v-if="message !== '' && error" class="message err" v-html="message"/>
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
    data: () => ({
        myRadius: "4",
        message: "",
        error: false,
        goMarked: false
    }),
    computed: {
        ...mapGetters([
            "currentPosition",
            "radius",
            "circonscription",
            "departement",
            "optimizedPath",
            "refreshPoints"
        ]),
        hint() {
            return this.myRadius + " km"
        },
        displayCirco() {
            return this.circonscription && this.circonscription !== null
        },
        disableBtn() {
            return !this.displayCirco || this.myRadius <= 0 || this.myRadius > 20
        }
    },
    methods: {
        resetMessageAfterDelay(delay = 3000) {
            setTimeout(() => {
                this.message = ""
            }, delay)
        },
        async submit() {
            if (this.myRadius > 0 && this.myRadius <= 20) {
                let result;
                const req = await getOptimizedPath(
                    this.currentPosition[0],
                    this.currentPosition[1],
                    this.myRadius,
                    this.departement,
                    this.circonscription,
                    this.goMarked
                );
                if (req.status === 200) {
                    result = await req.json().then((data) => {
                        return data
                    })

                    await this.$store.dispatch(UPDATE_OPTIMIZED_PATH, {
                        optimizedPath: result
                    })

                    this.error = false
                    this.message = "Un parcours a été trouvé !"
                    this.resetMessageAfterDelay()
                } else {
                    this.error = true
                    this.message = "Une erreur est survenue." +
                        "<br/>Veillez à sélectionner une circonscription en cliquant dessus." +
                        "<br/>Veillez à ce que le cercle dessiné contienne des panneaux."
                    this.resetMessageAfterDelay()
                }
            } else {
                alert("Veuillez sélectionner un rayon entre 1 et 50 km.")
            }
        }
    },
    watch: {
        myRadius: function() {
            this.$store.dispatch(UPDATE_RADIUS, {
                radius: this.myRadius
            })
        }
    }
};
</script>

<style lang="scss" scoped>
    @import "./FormOptimise.style";
</style>
