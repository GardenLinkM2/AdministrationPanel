<script>
    export default {
        data() {
            return {
                contracts: [],
                user: {}
            }
        },

        methods: {
            getContracts(){
                this.axios.get(localStorage.backUrl+"admin/leasing/user/"+this.$route.params.id, {headers: {"Authorization":localStorage.tokenBack}})
                    .then(response => {

                        response.data.data.forEach(e => {
                            this.axios.get(localStorage.backUrl+"api/Gardens/"+e.garden, {headers: {"Authorization":localStorage.tokenBack}})
                            .then(rep2 => {
                                e.gardenDetail = {
                                    name: rep2.data.data.name,
                                    location : rep2.data.data.location
                                };

                                this.axios.get(localStorage.backUrl+"api/Users/"+e.owner, {headers: {"Authorization":localStorage.tokenBack}})
                                .then(rep3 => {
                                    e.ownerDetail = rep3.data.data;

                                    this.contracts.push(e);
                                })
                            })
                        });

                        console.log(this.contracts);

                        this.contracts = response.data.data;
                    })
            },
            getUser(){
                this.axios.get(localStorage.backUrl+"api/Users/"+this.$route.params.id, {headers: {"Authorization":localStorage.tokenBack}})
                    .then(response => {
                        this.user = response.data.data;
                    })
            },
        },

        created() {
            this.getContracts();
            this.getUser();
        }

    }
</script>


<template>
    <div style="margin-top: 15px">

        <h2>
            <router-link to="/users"><span class="fas fa-long-arrow-alt-left" v-b-tooltip.hover
                                           title="Annuler et retourner à l'écran des utilisateurs"/></router-link>
            Contrats de l'utilisateur {{user.firstName}} {{user.lastName}}
        </h2>

        <span v-if="contracts.length===0" class="text-center">Aucun contrat pour l'utilisateur.</span>
        <div v-for="(obj, index) in contracts" v-bind:key="index">
            <br />
            <b-card header-tag="header" footer-tag="footer">
                <b-card-header>{{obj.id}} - {{obj.state}}</b-card-header>
                <b-card-text>Date de début : {{obj.begin}} - Date de fin : {{obj.end}}</b-card-text>
                <b-card-text v-if="obj.renew"><i>Renouvellement automatique</i></b-card-text>


                <b-card-text>{{a}}</b-card-text>
            </b-card>
        </div>


    </div>
</template>