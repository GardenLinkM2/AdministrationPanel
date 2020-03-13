<script>

    export default {

        data() {
            return {
                show: false,
                loading: false,
                obj: {},
                wallet: 0,
                walletId: null,
                newWallet: 0,
            }
        },

        methods: {

            display(obj) {
                this.show = true;
                this.loading = true;
                this.axios.get(localStorage.backUrl+"admin/wallets/user/"+obj.id, {headers: {"Authorization": localStorage.tokenBack}})
                .then(response => {
                    this.loading = false;
                    this.obj = obj;
                    this.walletId = response.data.data.id;
                    this.wallet = response.data.data.balance;
                    this.newWallet = this.wallet;
                })
            },

            updateWallet() {
                this.loading = true;
                let obj = {
                    balance: Number(this.newWallet)
                };

                this.axios.put(localStorage.backUrl + "api/wallets/" + this.walletId , obj, {headers: {"Authorization": localStorage.tokenBack}})
                    .then(() => {
                        this.$awn.success("Le porte-monnaie a bien été mis à jour !");
                        this.show = false;
                    })
                    .catch(() => {
                        this.$awn.alert("Erreur lors de la mise à jour du porte-monnaie !");
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
        <template v-slot:modal-title>Editer le Wallet de {{obj.firstName}} {{obj.lastName}}</template>
        <div class="d-block">
            <div v-if="loading===false">
                Wallet actuel de l'utilisateur : {{wallet}}.
                <br /><br />
                Nouveau wallet:
                <input type="number" v-model="newWallet" step="0.01" class="input-group-text" style="width: 100%"/>
                <br />
                <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-example')">Retour arrière</b-button>
                <b-button class="mt-3 btn-success" block @click="updateWallet()">Mettre à jour</b-button>
            </div>
            <div v-else>
                <div class="text-center">
                    <b-spinner variant="primary" label="Spinning"/>
                </div>
            </div>
        </div>
    </b-modal>
</template>