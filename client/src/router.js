import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import SignIn from './components/SignIn.vue'
import SignUp from './components/SignUp.vue'
Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/sign-in',
            name: 'SignIn',
            component: SignIn
        },
        {
            path: '/sign-up',
            name: 'SignUp',
            component: SignUp
        }
    ]
})
