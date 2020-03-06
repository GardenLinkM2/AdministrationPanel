<script>

    import regenerateTokenModal from "./regenerateTokenModal";
    import deleteModal from "./deleteModal";

    export default {
        components: {
            regenerateTokenModal,
            deleteModal
        },

        data() {
            return {
                loading:true,
                items: {}
            }
        },

        methods: {
            getClients() {
                this.axios.get(localStorage.authUrl + "clients?number=2000")
                    .then(response => {
                        this.items = response.data.content;
                        this.loading = false;
                    })
            },

        },

        mounted() {
            this.getClients();
        }
    }
</script>


<template>
    <div style="margin-top: 15px">
        <h2>Liste des clients</h2>
        <table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col">ClientID</th>
                    <th scope="col">Client Name</th>
                    <th scope="col">Base URL</th>
                    <th scope="col">Options</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="obj in items" v-bind:key="obj.id">
                    <th scope="row">{{obj.clientId}}</th>
                    <td>{{obj.clientName}}</td>
                    <td>{{obj.clientBaseURL}}</td>
                    <td>
                        <b-link class="fas fa-sync" style="margin-right:20px;" v-b-tooltip.hover title="Régénérer un token" v-on:click="$refs.rtm.display(obj)"/>
                        <b-link v-if="obj.clientId!=='account' && obj.clientId!=='gardenlink'" class="fas fa-trash" v-b-tooltip.hover v-on:click="$refs.dm.display(obj)" title="Supprimer le client"/>
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-if="loading" class="text-center">
            <b-spinner variant="success" type="grow" label="Spinning"/>
            <br/>
            Chargement en cours...
        </div>
        <router-link to="/auth/clients/create"><b-button variant="success" style="margin-top: 25px;">Ajouter un client</b-button></router-link>



        <regenerate-token-modal ref="rtm"/>
        <delete-modal ref="dm" v-on:deleted="getClients"/>
    </div>
</template>