<script>
    export default {

        data() {
            return {
                form: {
                    email: null,
                    firstName: null,
                    lastName: null,
                    password: null,
                    phone: null,
                    newsletter: null,
                    admin: null
                },
                users: null,
                loading: true,
                awaiting_answer : false
            }
        },

        watch: {
            'form.email': function () {
                this.checkUserEmail();
            }
        },

        created() {
            this.axios.get(localStorage.authUrl + "users?number=2000", {headers: {"Authorization": localStorage.token}})
                .then(response => {
                    this.users = response.data.content;
                })
                .catch(() => {
                    this.$awn.alert("Impossible de récupérer la liste des utilisateurs ! Retour à l'accueil");
                    this.$router.push("/dashboard")
                })

            this.axios.get(localStorage.authUrl+"users/"+this.$route.params.id, {headers: {"Authorization": localStorage.token}})
            .then(response => {
                this.form = response.data;
            })
            .catch(() => {
                this.$awn.alert("Impossible de récupérer les données de l'utilisateur !");
                this.$router.push("/auth/users");
            })
        },

        methods: {
            checkUserEmail() {
                var ok = (this.form.email !== "");
                this.users.forEach(e => {
                    if (e.email === this.form.email) {
                        ok = false;
                    }
                });
                this.loading = !ok
            },

            onSubmit() {
                console.log(this.form);
                this.awaiting_answer=true;
                this.axios.put(localStorage.authUrl+"users/"+this.$route.params.id, this.form, {headers: {"Authorization": localStorage.token}})
                .then(() => {
                    this.$awn.success("L'utilisateur a bien été mis à jour !");
                    this.$router.push("/auth/users")
                    })
                .catch(() => {
                    this.$awn.alert("Erreur lors de la mise à jour ! Veuillez réessayer.");
                })
                .finally(() => {
                    this.awaiting_answer=false;
                })
            },
        }
    }
</script>


<template>
    <div style="margin-top: 15px">

        <h2>
            <router-link to="/auth/users"><span class="fas fa-long-arrow-alt-left" v-b-tooltip.hover
                                                  title="Annuler et retourner à l'écran des utilisateurs"/></router-link>
            Editer l'utilisateur {{form.firstName}} {{form.lastName}}
        </h2>
        <i>Les champs ne devant pas être mis à jour peuvent rester vides.</i>

        <div v-if="awaiting_answer===true">
            <div class="text-center">
                <b-spinner variant="primary" label="Spinning"/>
            </div>
        </div>

        <b-form v-else @submit.prevent="onSubmit">
            <br/>

            <b-form-input
                    id="input-1"
                    v-model="form.email"
                    type="email"
                    :state="!loading"
                    placeholder="Adresse mail"
            />


            <b-form-input
                    id="input-2"
                    v-model="form.firstName"
                    type="text"
                    placeholder="Prénom"
            />

            <b-form-input
                    id="input-3"
                    v-model="form.lastName"
                    type="text"
                    placeholder="Nom de famille"
            />

            <b-form-input
                    id="input-4"
                    v-model="form.password"
                    type="password"
                    placeholder="Mot de passe"
            />

            <b-form-input
                    id="input-5"
                    v-model="form.phone"
                    type="text"
                    placeholder="Numéro de téléphone"
            />

            <b-form-checkbox
                    id="checkbox-1"
                    v-model="form.newsletter"
                    name="checkbox-1"
            >
                Inscription à la newsletter
            </b-form-checkbox>

            <b-form-checkbox
                    id="checkbox-2"
                    v-model="form.admin"
                    name="checkbox-2    "
            >
                Est administrateur
            </b-form-checkbox>

            <b-button type="submit" variant="success" style="margin-bottom: 15px;" :disabled="loading">Mettre à jour l'utilisateur
            </b-button>
        </b-form>

    </div>
</template>