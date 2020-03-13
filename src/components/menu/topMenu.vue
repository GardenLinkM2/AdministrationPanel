<script>
    export default {
        computed: {
            user() { return this.$store.state.user; }
        },

        methods: {
            logout(){
                this.$store.commit('logout');
                this.$awn.success("Vous avez été déconnecté.");
                this.$router.push("/");
            }
        }
    }
</script>

<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand><router-link to="/dashboard"><img src="/images/logo.png" height="40px;"/></router-link></b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item><router-link to="/" >Accueil</router-link></b-nav-item>
                    <b-nav-item><router-link to="/clients">Clients</router-link></b-nav-item>
                    <b-nav-item><router-link to="/users">Utilisateurs</router-link></b-nav-item>
                    <b-nav-item><router-link to="/gardens">Jardins</router-link></b-nav-item>
                    <b-nav-item><router-link to="/newsletter" >Envoyer une newsletter</router-link></b-nav-item>
                </b-navbar-nav>


                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-item v-on:click="logout()">Déconnexion (<i>{{user.fullName}} - {{user.env.toUpperCase()}}</i>)</b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>