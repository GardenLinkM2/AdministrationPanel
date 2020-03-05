<script>
    export default {

        data() {
            return {
                form: {
                    clientId: null,
                    clientName: null,
                    clientBaseURL: null,
                },
                clients: null,
                loading: true,
                awaiting_answer : false
            }
        },

        watch: {
            'form.clientId': function () {
                this.checkClientId();
            }
        },

        created() {
            this.axios.get(localStorage.authUrl + "clients?number=2000", {headers: {"Authorization": localStorage.token}})
                .then(response => {
                    this.clients = response.data.content;
                })
                .catch(() => {
                    this.$awn.alert("Impossible de récupérer la liste des clients ! Retour à l'accueil");
                    this.$router.push("/dashboard")
                })
        },

        methods: {
            checkClientId() {
                var ok = (this.form.clientId !== "");
                this.clients.forEach(e => {
                    if (e.clientId === this.form.clientId) {
                        ok = false;
                    }
                });
                this.loading = !ok
            },

            onSubmit() {
                this.awaiting_answer=true;
                this.axios.post(localStorage.authUrl+"clients", this.form, {headers: {"Authorization": localStorage.token}})
                .then(response => {
                    this.$bvModal.msgBoxOk('Le client a bien été créé. Son secret est : ' + response.data.client_secret + ' . Conservez-le précieusement !', {
                        title: 'Client créé !',
                        size: 'md',
                        buttonSize: 'md',
                        okVariant: 'success',
                        headerClass: 'p-2 border-bottom-0',
                        footerClass: 'p-2 border-top-0',
                        centered: true
                    })
                        .then(() => {
                            this.$router.push("/auth/clients")
                        })
                    })
                .catch(() => {
                    this.$awn.alert("Erreur lors de la création ! Veuillez réessayer.");
                })
                .finally(() => {
                    this.awaiting_answer=false;
                })
            },



            onReset() {
                this.form = {
                    clientId: null,
                    clientName: null,
                    clientBaseURL: null,
                };
            }
        }
    }
</script>


<template>
    <div style="margin-top: 15px">

        <h2>
            <router-link to="/auth/clients"><span class="fas fa-long-arrow-alt-left" v-b-tooltip.hover
                                                  title="Annuler et retourner à l'écran des clients"/></router-link>
            Ajouter un client
        </h2>

        <div v-if="awaiting_answer===true">
            <div class="text-center">
                <b-spinner variant="primary" label="Spinning"/>
            </div>
        </div>

        <b-form v-else @submit.prevent="onSubmit" @reset="onReset">
            <br/>
            <b-form-input
                    id="input-1"
                    v-model="form.clientId"
                    type="text"
                    required
                    :state="!loading"
                    placeholder="L'identifiant du client (exemple : gardenlink)"
            />


            <b-form-input
                    id="input-2"
                    v-model="form.clientName"
                    type="text"
                    required
                    placeholder="Le nom lisible du client (exemple : Client GardenLink)"
            />

            <b-form-input
                    id="input-3"
                    v-model="form.clientBaseURL"
                    type="text"
                    required
                    placeholder="L'URL du client (exemple : https://backendm2.artheriom.fr/"
            />


            <b-button type="submit" variant="success" style="margin-bottom: 15px;" :disabled="loading">Créer le client
            </b-button>
            <b-button type="reset" variant="danger">Réinitialiser le formulaire</b-button>
        </b-form>

    </div>
</template>