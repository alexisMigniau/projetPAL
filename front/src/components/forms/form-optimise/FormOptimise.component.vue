<template>
    <div class="formOptimise">
        <p>Veuillez sélectionner un cercle autour de votre position actuelle.</p>
        <v-form class="form" ref="form">
            <v-slider
                class="slider"
                label="Rayon (km)"
                max="50"
                min="1"
                step="1"
                v-model="radius"
                thumb-label
                prepend-icon="mdi-radius-outline"
            ></v-slider>
            <v-text-field
                class="textfield"
                v-model="radius"
                append-icon="mdi-radius-outline"
                label="Rayon (km)"
                min="1"
                max="50"
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
        </v-form>
    </div>
</template>

<script>
import { getOptimizedPath } from '@/services/api/panneaux'

export default {
    name: "FormOptimise",
    props: ["dataForOptimization", "optimizedPath"],
    data: () => ({
        radius: "5",
        optimized: null
    }),
    methods: {
        async submit() {
            if (this.radius > 0 && this.radius <= 50) {
                this.dataForOptimization.radius = this.radius

                const req = await getOptimizedPath(
                    this.dataForOptimization.latitude,
                    this.dataForOptimization.longitude,
                    this.dataForOptimization.radius,
                    this.dataForOptimization.departement,
                    this.dataForOptimization.circonscription
                );
                req.json().then((data) => {
                    this.optimized = data
                })
            } else {
                alert("Veuillez sélectionner un rayon entre 1 et 50 km.")
            }
        }
    },
    watch: {
        optimized: function(newValue) {
            this.optimizedPath = newValue
        }
    }
};
</script>

<style lang="scss" scoped>
    @import "./FormOptimise.style";
</style>
