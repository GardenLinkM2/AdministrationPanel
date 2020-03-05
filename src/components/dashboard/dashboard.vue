<script>

    export default {

        data(){
            return {
                clientNumber: 0,
                registeredNumber: 0,
            }
        },

        methods: {
            getUserNumber(){
                this.axios.get(localStorage.authUrl+"users")
                    .then(response => {
                        this.registeredNumber = response.data.totalElements;
                    })
            },
            getClientNumber(){
                this.axios.get(localStorage.authUrl+"clients")
                    .then(response => {
                        this.clientNumber = response.data.totalElements;
                    })
            }
        },

        mounted(){
            this.getUserNumber();
            this.getClientNumber();
        }
    }
</script>



<template>
    <div>
    <div style="display: flex; flex-direction: row; justify-content: space-around; margin-top: 20px;">
        <b-card title="Nombre d'inscrits" style="width:100%;" class="col-md-3 text-center">
            <b-card-text class="text-center">
                {{registeredNumber}}
            </b-card-text>
        </b-card>

        <b-card title="Applications liées" style="width:100%;" class="col-md-3 text-center">
            <b-card-text class="text-center">
                {{clientNumber}}
            </b-card-text>
        </b-card>

        <b-card title="Annonces publiées" style="width:100%;" class="col-md-3 text-center">
            <b-card-text class="text-center">
                XXXX
            </b-card-text>
        </b-card>
    </div>
    <div style="display: flex; flex-direction: row; justify-content: space-around; margin-top: 20px;">
        <b-card title="A propos" style="width:100%;" class="col-md-11 text-center">
            <b-card-text class="text-left">
                Copyright (c) 2020 - GardenLink. Tout droits réservés. <br/><br/>
                Fiérement développé par Alexis, Eric, Johann, Jean, Florian, Hakan, Nicolas & Nicolas, Vincent, Benoit, Axel et Nasser.<br /><br />
                <b-link href="https://git.archal.fr/gardenlink/" target="_blank">Accès aux sources</b-link><br />
                <b-link href="https://binaries.artheriom.fr/" target="_blank">Accès Artifactory</b-link><br />
                <b-link href="https://quality.artheriom.fr/" target="_blank">Accès Sonarqube</b-link>

            </b-card-text>
        </b-card>
    </div>
    </div>
</template>