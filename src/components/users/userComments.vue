<script>
    export default {
        data() {
            return {
                user: {},
                comments: []
            }
        },

        methods: {
            getUser(){
                this.axios.get(localStorage.backUrl+"api/Users/"+this.$route.params.id, {headers: {"Authorization":localStorage.tokenBack}})
                .then(response => {
                    this.user = response.data.data;
                })
            },

            deleteComment(id){
                this.$awn.info("Suppression en cours...");
                this.axios.delete(localStorage.backUrl+"api/score/"+id, {headers: {"Authorization": localStorage.tokenBack}})
                    .then(() => {
                        this.comments = [];
                        this.$awn.success("Le commentaire a bien été supprimé.");
                        this.getComments();
                    })
                .catch(() => {
                    this.$awn.alert("Impossible de supprimer le commentaire !");
                })
            },

            getComments(){

                this.axios.get(localStorage.backUrl+"api/Users/"+this.$route.params.id+"/score", {headers: {"Authorization":localStorage.tokenBack}})
                    .then(response => {
                        response.data.data.forEach(e => {
                            this.axios.get(localStorage.backUrl+"api/Users/"+e.rater, {headers: {"Authorization":localStorage.tokenBack}})
                            .then(res2 => {
                                e.user = res2.data.data.firstName + " " + res2.data.data.lastName;

                                this.comments.push(e);
                            })
                        });
                    });
            }
        },

        created() {
            this.getUser();
            this.getComments();
        }

    }
</script>


<template>
    <div style="margin-top: 15px">

        <h2>
            <router-link to="/users"><span class="fas fa-long-arrow-alt-left" v-b-tooltip.hover
                                           title="Annuler et retourner à l'écran des utilisateurs"/></router-link>
            Commentaires sur l'utilisateur {{user.firstName}} {{user.lastName}}
        </h2>

        <span v-if="comments.length===0" class="text-center">Aucun commentaire pour l'utilisateur.</span>
        <div v-for="(obj, index) in comments" v-bind:key="index">
            <br />
            <b-card header-tag="header" footer-tag="footer">
                <template v-slot:header>
                    <h6 class="mb-0">Par {{obj.user}}
                        <span style="color: gold; margin-left:15px"  v-b-tooltip.hover :title="'Note : '+obj.mark+' / 5'">
                            <span class="fas fa-star" v-for="i in obj.mark" v-bind:key="'fullstar'+i"/>
                            <span class="far fa-star" v-for="j in 5-obj.mark" v-bind:key="'emptystar'+j"/>
                        </span>
                    </h6>
                </template>
                <b-card-text>{{obj.comment}}</b-card-text>
                <template v-slot:footer>
                    <em><b-link v-on:click="deleteComment(obj.id)">Supprimer</b-link></em>
                </template>
            </b-card>
        </div>


    </div>
</template>