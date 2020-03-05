import Vue from 'vue'
import Router from 'vue-router'
import login from './components/login/login'
import loginLayout from './components/loginLayout'
import fullLayout from "./components/fullLayout";
import dashboard from './components/dashboard/dashboard'
import clientList from "./components/auth/clients/clientList";
import emptyLayout from "./components/emptyLayout"
import createClient from "./components/auth/clients/createClient";
import userList from "./components/auth/users/userList";

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: loginLayout,
            children: [
                {
                    path: '',
                    component: login
                }
            ]
        },
        {
            path: '/dashboard',
            component: fullLayout,
            children: [
                {
                    path: '',
                    component: dashboard
                }
            ]
        },
        {
            path: '/auth',
            component: fullLayout,
            children: [
                {
                    path: 'clients',
                    component: emptyLayout,
                    children: [
                        {
                            path: '',
                            component: clientList
                        },
                        {
                            path: 'create',
                            component: createClient
                        }
                    ]
                },
                {
                    path: 'users',
                    component: emptyLayout,
                    children: [
                        {
                            path: '',
                            component: userList
                        }
                    ]
                }
            ]
        },


    ]
});

Vue.use(Router);

export default router