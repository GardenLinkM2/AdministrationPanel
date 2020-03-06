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
                    <b-nav-item-dropdown left>
                        <template v-slot:button-content>
                            <em>Gestion de l'authentification</em>
                        </template>
                        <b-dropdown-item><router-link to="/auth/clients">Clients</router-link></b-dropdown-item>
                        <b-dropdown-item><router-link to="/auth/users">Utilisateurs</router-link></b-dropdown-item>
                    </b-nav-item-dropdown>
                    <b-nav-item-dropdown left>
                        <template v-slot:button-content>
                            <em>Gestion de l'API</em>
                        </template>
                        <b-dropdown-item><router-link to="/api/users">Utilisateurs (TODO)</router-link></b-dropdown-item>
                        <b-dropdown-item><router-link to="/api/gardens">Jardins (TODO)</router-link></b-dropdown-item>
                    </b-nav-item-dropdown>
                    <b-nav-item><router-link to="/newsletter" >Newsletter (TODO)</router-link></b-nav-item>
                </b-navbar-nav>


                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-item v-on:click="logout()">Déconnexion (<i>{{user.fullName}} - {{user.env.toUpperCase()}}</i>)</b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>