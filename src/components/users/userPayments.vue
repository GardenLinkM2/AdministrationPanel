<script>
    export default {

        data(){
            return {
                user: {},
                payments: []
            }
        },

        methods: {
            getUser(){
                this.axios.get(localStorage.backUrl+"api/Users/"+this.$route.params.id, {headers: {"Authorization":localStorage.tokenBack}})
                    .then(response => {
                        this.user = response.data.data;
                    })
            },
            getPayment(){
                this.axios.get(localStorage.backUrl+"admin/payments/user/"+this.$route.params.id, {headers: {"Authorization":localStorage.tokenBack}})
                    .then(response => {
                        this.payments = response.data.data;
                    })
            }
        },

        mounted(){
            this.getUser();
            this.getPayment();
        }
    }
</script>

<template>
    <div style="margin-top: 15px">
        <h2>Paiements de l'utilisateur {{user.firstName}} {{user.lastName}}</h2>
        <table class="table table-hover">
            <thead>
            <tr>
                <th scope="col">Montant</th>
                <th scope="col">Date</th>
                <th scope="col">ID Contrat</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="obj in payments" v-bind:key="obj.id">
                <th scope="row">{{obj.id}}</th>
                <td>{{obj.date}}</td>
                <td>{{obj.leasing}}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>