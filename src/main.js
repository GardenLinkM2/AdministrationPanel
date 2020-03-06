import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import router from './router.js'
import store from './store.js'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueAWN from "vue-awesome-notifications"

import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'

Vue.use(BootstrapVue);
Vue.use(VueAxios, axios);
Vue.use(VueAWN, {durations: {global: 6000}, labels: {success: "Succès", warning: "Attention", alert: "Erreur !"}});

new Vue({
    router,
    store,
    render: h => h(App),
    created() {
        if (localStorage.token != null && localStorage.authUrl != null && localStorage.backUrl != null) {
            axios.get(localStorage.authUrl + "users/me", {headers: {Authorization: localStorage.token}})
                .then(response => {
                    let obj = {};

                    obj.id = response.data.id;
                    obj.fullName = response.data.firstName + " " + response.data.lastName;
                    obj.avatar = response.data.avatar.length === 0 ? "/images/avatar.png" : response.data.avatar;
                    obj.admin = response.data.admin;
                    obj.token = localStorage.token;
                    obj.env = localStorage.env;
                    obj.tokenBack = localStorage.tokenBack;

                    if (obj.admin === false) {
                        this.$store.commit("logout");
                    } else {
                        this.$store.commit('login', obj);
                    }
                })
                .catch(() => {
                    this.$store.commit('logout');
                    this.$router.push("/");
                    this.$awn.alert("Votre session a expirée, veuillez vous reconnecter.");
                })
        } else {
            this.$router.push("/");
        }
    },
}).$mount('#app');
