<script>

    export default {

        data() {
            return {
                show: false,
                step: null,
                loading: false,
                obj: {}
            }
        },

        methods: {

            display(obj) {
                this.show = true;
                this.step = 1;
                this.loading = false;
                this.obj = obj;
            },

            regenerateToken() {
                this.loading = true;
                this.axios.get(localStorage.authUrl + "clients/" + this.obj.id + "/regenerateSecret", {headers: {"Authorization": localStorage.token}})
                    .then(response => {
                        this.newToken = response.data.client_secret;
                        this.step = 2;
                    })
                    .catch(() => {
                        this.$awn.alert("Erreur lors de la régénération du token !");
                        this.show = false;
                    })
                    .finally(() => {
                        this.loading = false;
                    })
            }
        },

    }
</script>


<template>
    <b-modal id="bv-modal-example" hide-footer v-model="show">
        <template v-slot:modal-title>Régénérer un token pour {{obj.clientName}}</template>
        <div class="d-block">
            <div v-if="loading===false && step===1">
                Voulez-vous vraiment régénérer un token pour <i>{{obj.clientName}}</i> ? Tout les tokens précédemment
                générés seront invalidés, et vous devrez reconfigurer toutes les applications utilisant ce client !
                <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-example')">Non</b-button>
                <b-button class="mt-3 btn-info" block @click="regenerateToken()">Oui</b-button>
            </div>
            <div v-if="loading===false && step===2">
                Le nouveau secret pour le client {{obj.clientName}} est : <code>{{newToken}}</code>. Gardez-le
                précieusement : Ce secret ne pourra pas être récupéré.
            </div>
            <div v-if="loading===true">
                <div class="text-center">
                    <b-spinner variant="primary" label="Spinning"/>
                </div>
            </div>
        </div>
    </b-modal>
</template>