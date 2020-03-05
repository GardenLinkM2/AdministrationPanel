<script>

    export default {


        data() {
            return {
                items: {}
            }
        },

        methods: {
            getClients() {
                this.axios.get(localStorage.authUrl + "users?number=20000", {headers: {"Authorization": localStorage.token}})
                    .then(response => {
                        this.items = response.data.content;
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
        <h2>Liste des utilisateurs</h2>
        <table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Nom complet</th>
                    <th scope="col">Adresse mail</th>
                    <th scope="col">Téléphone</th>
                    <th scope="col">Newsletter</th>
                    <th scope="col">Options</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="obj in items" v-bind:key="obj.id">
                    <th scope="row">{{obj.firstName}} {{obj.lastName}}</th>
                    <td>{{obj.email}}</td>
                    <td>{{obj.phone}}</td>
                    <td v-if="obj.newsletter">Oui</td>
                    <td v-else>Non</td>
                    <td>
                        <span v-if="obj.clientId!=='account'">
                            <b-link class="fas fa-user-edit" style="margin-right:20px;" v-b-tooltip.hover title="Editer l'utilisateur" v-on:click="$refs.rtm.display(obj)"/>
                            <b-link class="fas fa-envelope-open-text" style="margin-right:20px;" v-b-tooltip.hover title="Envoyer un nouveau mot de passe" v-on:click="$refs.rtm.display(obj)"/>
                            <b-link class="fas fa-trash" v-b-tooltip.hover v-on:click="$refs.dm.display(obj)" title="Supprimer le client"/>
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
        <router-link to="/auth/clients/create"><b-button variant="success" style="margin-top: 25px;">Ajouter un utilisateur</b-button></router-link>


        <regenerate-token-modal ref="rtm"/>
        <delete-modal ref="dm" v-on:deleted="getClients"/>
    </div>
</template>