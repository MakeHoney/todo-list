import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        accessToken: localStorage.getItem('accessToken')
    },
    getters: {
        accessToken: state => state.accessToken
    },
    mutations: {
        signIn (state, { token }) {
            state.accessToken = token
            localStorage.setItem('accessToken', token)
        },
        signOut (state) {
            state.accessToken = null
            localStorage.removeItem('accessToken')
        }
    },
    actions: {
        async signIn ({ commit }, { uid, password }) {
            let url = 'http://localhost:8888/auth/sign-in'
            try {
                let { data } = await axios.post(url, { uid, password })
                commit('signIn', data)
            } catch (err) {
                throw err
            }
        },
        async signUp ({ commit }, { uid, password }) {
            let url = 'http://localhost:8888/auth/sign-up'
            try {
                await axios.post(url, { uid, password })
            } catch (err) {
                throw err
            }
        },
        signOut ({ commit }) {
            commit('signOut')
        }
    }
})
