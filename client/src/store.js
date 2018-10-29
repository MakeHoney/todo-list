import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        accessToken: null
    },
    mutations: {
        signIn (state, { accessToken }) {
            state.accessToken = accessToken
        },
        signOut (state) {
            state.accessToken = null
        }
    },
    actions: {
        async signIn ({ commit }, { uid, password }) {
            let res = await axios.post('http://localhost:8888/sign-in', { uid, password })
            let token = res.data
            commit('signIn', token)
        },
        signOut ({ commit }) {
            commit('signOut')
        }
    }
})
