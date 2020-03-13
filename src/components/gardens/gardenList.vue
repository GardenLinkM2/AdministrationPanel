<script>

    import detailModal from "./detailModal";
    export default {

        components: {
            detailModal
        },

        data(){
            return {
                pending: [],
                gardens: []
            }
        },

        mounted(){
            this.getPendingGardens();
            this.getGardens();
        },

        methods: {
            getPendingGardens(){
                this.axios.get(localStorage.backUrl+"admin/gardens/pendings", {headers: {"Authorization":localStorage.tokenBack}})
                .then(response => {
                    this.pending = response.data.data;
                    console.log(this.pending);
                })
                .catch(() => {
                    this.$awn.alert("Impossible de récupérer la liste des jardins en attente !");
                })
            },
            getGardens(){
                this.axios.get(localStorage.backUrl+"api/Gardens", {headers:{"Authorization":localStorage.tokenBack}})
                .then(reponse => {
                    this.gardens = reponse.data.data;
                    console.log(this.gardens);
                })
                .catch(() => {
                    this.$awn.alert("Impossible de récupérer la liste des jardins !");
                })
            },
            acceptGarden(id){
                this.axios.put(localStorage.backUrl+"admin/gardens/"+id+"/validation", {"status":"Accepted"}, {headers: {"Authorization":localStorage.tokenBack}})
                .then(() => {
                    this.$awn.success("Jardin approuvé avec succès !");
                    this.getPendingGardens();
                    this.getGardens();
                })
                .catch(() => {
                    this.$awn.alert("Erreur lors de l'approbation du jardin! ");
                })
            },
            rejectGarden(id){
                this.axios.put(localStorage.backUrl+"admin/gardens/"+id+"/validation", {"status":"Refused"}, {headers: {"Authorization":localStorage.tokenBack}})
                    .then(() => {
                        this.$awn.success("Jardin refusé avec succès !");
                        this.getPendingGardens();
                        this.getGardens();
                    })
                    .catch(() => {
                        this.$awn.alert("Erreur lors du refus du jardin! ");
                    })
            },
        }

    }
</script>

<template>
    <div style="margin-top: 15px">
        <h2>Liste des jardins en attente</h2>
        <table class="table table-hover">
            <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Nom</th>
                <th scope="col">Ville</th>
                <th scope="col">Prix</th>
                <th scope="col">Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="obj in pending" v-bind:key="obj.id">
                <th scope="row">{{obj.id}}</th>
                <td>{{obj.name}}</td>
                <td>{{obj.location.city}} ({{obj.location.postalCode.toString().slice(0,2)}}) </td>
                <td>{{obj.criteria.price}} €</td>
                <td>
                    <b-link class="fas fa-info" style="margin-right:20px;" v-b-tooltip.hover v-on:click="$refs.detail.display(obj)" title="Voir les détails"/>
                    <b-link class="fas fa-user" style="margin-right:20px;" v-b-tooltip.hover :to="'/users/edit/'+obj.owner" title="Voir l'utilisateur"/>
                    <b-link class="fas fa-check" style="margin-right:20px;" v-b-tooltip.hover v-on:click="acceptGarden(obj.id)" title="Accepter"/>
                    <b-link class="fas fa-times" v-b-tooltip.hover v-on:click="rejectGarden(obj.id)" title="Refuser"/>
                </td>
            </tr>
            </tbody>
        </table>
        <br /><br />
        <h2>Liste des jardins validés</h2>
        <table class="table table-hover">
            <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Nom</th>
                <th scope="col">Ville</th>
                <th scope="col">Prix</th>
                <th scope="col">En location</th>
                <th scope="col">Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="obj in gardens" v-bind:key="obj.id">
                <th scope="row">{{obj.id}}</th>
                <td>{{obj.name}}</td>
                <td>{{obj.location.city}}</td>
                <td>{{obj.criteria.price}}</td>
                <td>{{obj.isReserved ? "Oui" : "Non"}}</td>
                <td>
                    <b-link class="fas fa-info" style="margin-right:20px;" v-b-tooltip.hover v-on:click="$refs.detail.display(obj)" title="Voir les détails"/>
                    <b-link class="fas fa-user" style="margin-right:20px;" v-b-tooltip.hover :to="'/users/edit/'+obj.owner" title="Voir l'utilisateur"/>
                    <b-link class="fas fa-comments" style="margin-right: 20px;" :to="'/gardens/comments/'+obj.id" v-b-tooltip.hover title="Voir les commentaires"/>
                </td>
            </tr>
            </tbody>
        </table>


        <detail-modal ref="detail"/>
    </div>
</template>

