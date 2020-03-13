import Vue from 'vue'
import Router from 'vue-router'
import login from './components/login/login'
import loginLayout from './components/loginLayout'
import fullLayout from "./components/fullLayout";
import dashboard from './components/dashboard/dashboard'
import newsletter from "./components/newsletter/newsletter";

import authClientList from "./components/clients/clientList";
import authCreateClient from "./components/clients/createClient";
import authUserList from "./components/users/userList";
import authCreateUser from "./components/users/createUser";
import authEditUser from "./components/users/editUser";
import userComments from "./components/users/userComments";
import userContracts from "./components/users/userContracts";
import userPayments from "./components/users/userPayments";
import gardenList from "./components/gardens/gardenList";
import gardenComments from "./components/gardens/gardenComments";

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
            path: '/gardens',
            component: fullLayout,
            children: [
                {
                    path: '',
                    component: gardenList
                },
                {
                    path: "comments/:id",
                    component: gardenComments
                }
            ]
        },

        {
            path: '/clients',
            component: fullLayout,
            children: [
                {
                    path: '',
                    component: authClientList
                },
                {
                    path: 'create',
                    component: authCreateClient
                }
            ]
        },
                {
                    path: '/users',
                    component: fullLayout,
                    children: [
                        {
                            path: '',
                            component: authUserList
                        },
                        {
                            path: 'create',
                            component: authCreateUser
                        },
                        {
                            path: 'edit/:id',
                            component: authEditUser
                        },
                        {
                            path: "comments/:id",
                            component: userComments
                        },
                        {
                            path: "contracts/:id",
                            component: userContracts
                        },
                        {
                            path: "payments/:id",
                            component: userPayments
                        }
                    ]
                },

        {
            path: '/newsletter',
            component: fullLayout,
            children: [
                {
                    path: '',
                    component: newsletter
                }
            ]
        }
]
});

Vue.use(Router);

export default router