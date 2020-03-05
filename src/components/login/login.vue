<script>
    export default {

        data() {
            return {
                form: {
                    clientId: "account",
                    env: "prd"
                },
                sending: false
            }
        },


        computed: {
            user() {
                return this.$store.state.user;
            },
            userToken() {
                return this.$store.state.user.token;
            }
        },

        watch: {
            userToken() {
                this.redirect();
            }
        },

        created() {
            this.redirect();
        },

        methods: {
            redirect() {
                if (this.user.token !== null && this.user.token !== "") {
                    this.$router.push("/dashboard");
                }
            },
            doLogin() {
                this.sending = true;

                //Defining env
                if(this.form.env==="prd"){
                    localStorage.authUrl = process.env.VUE_APP_AUTH_API_PRD;
                    localStorage.backUrl = process.env.VUE_APP_BACK_API_PRD;
                } else {
                    localStorage.authUrl = process.env.VUE_APP_AUTH_API_DEV;
                    localStorage.backUrl = process.env.VUE_APP_BACK_API_DEV;
                }

                this.axios.post(localStorage.authUrl + "auth/token", this.form)
                    .then(response => {
                        this.axios.get(localStorage.authUrl + "users/me", {headers: {"Authorization": response.data.access_token}})
                            .then(res => {
                                let obj = res.data;
                                obj.token = response.data.access_token;
                                obj.fullName = obj.firstName + " " + obj.lastName;
                                obj.env = this.form.env;

                                if (obj.admin) {
                                    this.$awn.success("Bienvenue, " + obj.fullName);
                                    this.$store.commit("login", obj);
                                } else {
                                    this.$awn.alert("Vous n'êtes pas administrateur. Annulation de la connexion.");
                                }
                            })
                            .catch(() => {
                                this.$awn.alert("Erreur lors de la connexion.");
                            })
                    })
                    .catch(() => {
                        this.$awn.alert("Erreur lors de la connexion.");
                    })
                    .finally(() => {
                        this.sending = false;
                    })
            }
        }
    }
</script>

<template>
    <b-card header-tag="header" footer-tag="footer" class="loginmodal">
        <template v-slot:header>
            <h6 class="mb-0">Connexion - GardenLink</h6>
        </template>
        <b-card-text v-if="!sending">Veuillez vous connecter pour accéder au panneau d'administration.</b-card-text>

        <b-card-body>
            <div v-if="sending" class="text-center">
                <b-spinner variant="success" type="grow" label="Spinning"/>
                <br/>
                Chargement en cours...
            </div>
            <b-form v-on:submit.prevent="doLogin()" v-if="!sending">
                <b-form-input id="email" v-model="form.email" type="email" required
                              placeholder="example@localhost.com"/>
                <b-form-input id="password" v-model="form.password" type="password" required
                              placeholder="Mot de passe"/>
                <b-form-select id="environment" v-model="form.env" type="select">
                    <b-form-select-option value="prd" aria-selected="true">Production</b-form-select-option>
                    <b-form-select-option value="dev">Développement</b-form-select-option>
                </b-form-select>
                <b-button type="submit" variant="primary">Connexion</b-button>
            </b-form>
        </b-card-body>
        <template v-slot:footer>
            <em>Copyright (c) 2020 - GardenLink</em>
        </template>
    </b-card>
</template>