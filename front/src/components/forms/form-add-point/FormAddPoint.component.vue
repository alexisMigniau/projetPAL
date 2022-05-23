<template>
    <div class="formAddPoint">
        <p class="advice">Veuillez sélectionner un module d'ajout de point(s)</p>
        <v-form class="form" ref="form">
            <v-select
                class="module"
                label="Module"
                v-model="select"
                :items="items"
                item-text="hint"
                item-value="mode"
                return-object
                outlined
            ></v-select>
            <div v-if="select.mode === 'address'" class="address">
                <v-text-field
                    class="address"
                    v-model="address"
                    append-icon="mdi-map-marker-outline"
                    label="Saisissez une adresse ici"
                    placeholder="2 Boulevard de Lavoisier, 49000 Angers"
                    outlined
                    required
                ></v-text-field>
            </div>
            <div v-else-if="select.mode === 'file'" class="file">
                <v-file-input
                    label="Choisissez un fichier .geojson"
                    v-model="file"
                    prepend-icon="mdi-paperclip"
                    outlined
                    dense
                ></v-file-input>
            </div>
            <v-btn
                class="button"
                color="primary"
                @click="submit"
                :disabled="disableBtn"
            >
                Ajouter
            </v-btn>
            <p v-if="message !== '' && !error" class="message">{{message}}</p>
            <p v-if="message !== '' && error" class="message err">{{message}}</p>
        </v-form>
    </div>
</template>

<script>
import {
    addPanneauWithGPS,
    addPanneauWithAdresse,
    addPanneauWithFile
} from '@/services/api/panneaux'

import { mapGetters } from "vuex";
import { UPDATE_REFRESH_POINTS } from "@/store/actions.type";

export default {
    name: "FormOptimise",
    data: () => ({
        select: { mode: "location", hint: "Utiliser la localisation actuelle" },
        items: [
            { mode: "location", hint: "Utiliser la localisation actuelle" },
            { mode: "address", hint: "Entrer une adresse réelle" },
            { mode: "file", hint: "Télécharger un fichier .geojson" }
        ],
        address: "",
        file: null,
        message: "",
        error: false,
        result: null
    }),
    computed: {
        ...mapGetters([
            "currentPosition",
            "refreshPoints"
        ]),
        disableBtn() {
            return (this.select.mode === "address" && this.address === "")
                || (this.select.mode === "file" && this.file === null)
        }
    },
    methods: {
        resetMessageAfterDelay(delay = 3000) {
            setTimeout(() => {
                this.message = ""
            }, delay)
        },
        submit() {
            switch(this.select.mode) {
                case "location":
                    this.addWithLocation()
                    break
                case "address":
                    this.addWithAddress()
                    break
                case "file":
                    this.addWithFile()
                    break
            }
        },
        async addWithLocation() {
            console.log("hi !")
            const req = await addPanneauWithGPS(
                this.currentPosition[0],
                this.currentPosition[1]
            )

            if (req.status === 200) {
                await this.$store.dispatch(UPDATE_REFRESH_POINTS, {
                    refreshPoints: !this.refreshPoints
                })

                this.error = false
                this.message = "Votre position actuelle a été ajoutée en tant que nouveau panneau d'affichage libre."
                this.resetMessageAfterDelay()
            } else {
                this.error = true
                this.message = "Une erreur est survenue lors de l'ajout de ce nouveau point."
                this.resetMessageAfterDelay()
            }
        },
        async addWithAddress() {
            const req = await addPanneauWithAdresse(
                this.address
            )

            if (req.status === 200) {
                await this.$store.dispatch(UPDATE_REFRESH_POINTS, {
                    refreshPoints: !this.refreshPoints
                })

                this.error = false
                this.message = "Cette adresse a été ajoutée en tant que nouveau panneau d'affichage libre."
                this.resetMessageAfterDelay()
            } else {
                this.error = true
                this.message = "Une erreur est survenue lors de l'ajout de ce nouveau point."
                this.resetMessageAfterDelay()
            }
        },
        async addWithFile() {
            const formData = new FormData()
            formData.append("file", this.file)

            const req = await addPanneauWithFile(
                formData
            )

            if (req.status === 200) {
                await this.$store.dispatch(UPDATE_REFRESH_POINTS, {
                    refreshPoints: !this.refreshPoints
                })

                this.error = false
                this.message = "Les points GPS contenus dans le tichier téléchargé ont été ajoutés en tant que nouveaux panneaux d'affichage libre."
                this.resetMessageAfterDelay()
            } else {
                this.error = true
                this.message = "Une erreur est survenue."
                this.resetMessageAfterDelay()
            }
        }
    }
};
</script>

<style lang="scss" scoped>
    @import "./FormAddPoint.style";
</style>
