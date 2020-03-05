import Vue from 'vue'
import Router from 'vue-router'
import login from './components/login/login'
import loginLayout from './components/loginLayout'
import fullLayout from "./components/fullLayout";
import dashboard from './components/dashboard/dashboard'

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
        }

    ]
});

Vue.use(Router);

export default router