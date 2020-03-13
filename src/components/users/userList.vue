<script>

    import deleteModal from "./deleteModal";
    import updateWallet from "./updateWallet";

    export default {
        components: {
            deleteModal,
            updateWallet
        },

        data() {
            return {
                items: {},
                itemsBack: [],
                loading: true
            }
        },

        methods: {
            getUsers() {
                this.axios.get(localStorage.authUrl + "users?number=20000", {headers: {"Authorization": localStorage.token}})
                    .then(response => {
                        this.items = response.data.content;
                        this.loading=false;
                    })
            },

            getUsersFromBackend() {
                this.axios.get(localStorage.backUrl + "api/Users", {headers: {"Authorization": localStorage.tokenBack}})
                .then(response => {
                    response.data.data.forEach(e => {
                        this.itemsBack.push(e.id);
                    });
                })
            },

            sendNewPassword(obj) {
                this.$awn.info("Tentative d'envoi en cours...");
                this.axios.get(localStorage.authUrl+"lostpassword/"+obj.email)
                .then(() => {
                    this.$awn.success("Un nouveau mot de passe a été envoyé à "+obj.email+".")
                })
                .catch(() => {
                    this.$awn.alert("Erreur lors de l'envoi du mot de passe !")
                })
            }

        },

        mounted() {
            this.getUsers();
            this.getUsersFromBackend();
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
                    <th scope="col">NS.</th>
                    <th scope="col">Admin.</th>
                    <th scope="col">AuthAdmin</th>
                    <th scope="col">BackAdmin</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="obj in items" v-bind:key="obj.id">
                    <th scope="row">{{obj.firstName}} {{obj.lastName}}</th>
                    <td>{{obj.email}}</td>
                    <td>{{obj.phone}}</td>
                    <td v-if="obj.newsletter">Oui</td>
                    <td v-else>Non</td>
                    <td v-if="obj.admin">Oui</td>
                    <td v-else>Non</td>
                    <td>
                        <span v-if="obj.email!=='administrator@localhost.com'">
                            <router-link :to="'/users/edit/'+obj.id"><span class="fas fa-user-edit" style="margin-right:20px;" v-b-tooltip.hover title="Editer l'utilisateur"/></router-link>
                            <b-link class="fas fa-envelope-open-text" style="margin-right:20px;" v-b-tooltip.hover title="Envoyer un nouveau mot de passe" v-on:click="sendNewPassword(obj)"/>
                            <b-link class="fas fa-trash" v-b-tooltip.hover v-on:click="$refs.dm.display(obj)" title="Supprimer l'utilisateur"/>
                        </span>
                        <span v-else v-b-tooltip.hover title="Impossible de modifier un administrateur"><i>Indisponible.</i></span>
                    </td>
                    <td>
                        <span v-if="itemsBack.includes(obj.id)">
                            <router-link :to="'/users/comments/'+obj.id">
                                <span class="fas fa-comments" style="margin-right:20px;" v-b-tooltip.hover title="Afficher/Editer les commentaires et notes données à l'utilisateur"/>
                            </router-link>
                            <b-link class="fas fa-wallet" style="margin-right:20px;" v-b-tooltip.hover title="Voir/Editer le wallet de l'utilisateur" v-on:click="$refs.uw.display(obj)"/>
                            <router-link :to="'/users/contracts/'+obj.id">
                                <span class="fas fa-file-contract" style="margin-right:20px;" v-b-tooltip.hover title="Voir les contrats en cours pour l'utilisateur"/>
                            </router-link>
                            <router-link :to="'/users/payments/'+obj.id">
                                <span class="fas fa-receipt" style="margin-right:20px;" v-b-tooltip.hover title="Afficher les paiments de l'utilisateur"/>
                            </router-link>
                        </span>
                        <span v-else v-b-tooltip.hover title="L'utilisateur ne s'est jamais connecté sur le backend. Impossible de modifier son profil."><i>Indisponible.</i></span>

                    </td>
                </tr>
            </tbody>
        </table>
        <div v-if="loading" class="text-center">
            <b-spinner variant="success" type="grow" label="Spinning"/>
            <br/>
            Chargement en cours...
        </div>
        <router-link to="/users/create"><b-button variant="success" style="margin-top: 25px;">Ajouter un utilisateur</b-button></router-link>


        <delete-modal ref="dm" v-on:deleted="getUsers"/>
        <update-wallet ref="uw"/>
    </div>
</template>