<script>

    export default {

        data() {
            return {
                show: false,
                loading: false,
                obj: {}
            }
        },

        methods: {

            display(obj) {
                this.show = true;
                this.loading = false;
                this.obj = obj;
            },

            regenerateToken() {
                this.loading = true;
                this.axios.delete(localStorage.authUrl + "clients/" + this.obj.id , {headers: {"Authorization": localStorage.token}})
                    .then(() => {
                        this.$awn.success("Le client a bien été supprimé !");
                        this.$emit("deleted");
                        this.show = false;
                    })
                    .catch(() => {
                        this.$awn.alert("Erreur lors de la suppression du client !");
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
        <template v-slot:modal-title>Supprimer le client {{obj.clientName}}</template>
        <div class="d-block">
            <div v-if="loading===false">
                Voulez-vous vraiment supprimer le client <i>{{obj.clientName}}</i> ? Cette action est <b>irréversible !</b>
                <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-example')">Non</b-button>
                <b-button class="mt-3 btn-danger" block @click="regenerateToken()">Oui</b-button>
            </div>
            <div v-else>
                <div class="text-center">
                    <b-spinner variant="primary" label="Spinning"/>
                </div>
            </div>
        </div>
    </b-modal>
</template>