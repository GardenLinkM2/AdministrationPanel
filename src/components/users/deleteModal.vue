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
                this.axios.delete(localStorage.authUrl + "users/" + this.obj.id , {headers: {"Authorization": localStorage.token}})
                    .then(() => {
                        this.$awn.success("L'utilisateur a bien été supprimé !");
                        this.$emit("deleted");
                        this.show = false;
                    })
                    .catch(() => {
                        this.$awn.alert("Erreur lors de la suppression de l'utilisateur !");
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
        <template v-slot:modal-title>Supprimer l'utilisateur {{obj.firstName}} {{obj.lastName}}</template>
        <div class="d-block">
            <div v-if="loading===false">
                Voulez-vous vraiment supprimer l'utilisateur <i>{{obj.firstName}} {{obj.lastName}}</i> ? Cette action est <b>irréversible !</b>
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