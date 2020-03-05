import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: {
      id: null,
      fullName: null,
      avatar: null,
      admin: null,
      token: null
    }
  },
  mutations: {

    login(state, user) {
      state.user.id = user.id;
      state.user.fullName = user.fullName;
      state.user.avatar = user.avatar;
      state.user.admin = user.admin;
      state.user.token = user.token;

      //Enregistrement localStorage
      localStorage.id = state.user.id;
      localStorage.fullName = state.user.fullName;
      localStorage.avatar = state.user.avatar;
      localStorage.admin = state.user.admin;
      localStorage.token = state.user.token;
    },

    logout(state) {
      state.user = {
        id: null,
        fullName: null,
        avatar: null,
        admin: null,
        token: null
      };

      //Nettoyage
      localStorage.clear();
  },
  }
});

export default store