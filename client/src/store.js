import Vue from 'vue'
import Vuex from 'vuex'

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
            let res = await axios.post('http://13.209.8.64:3333', { uid, password })
            let token = res.data
            commit('signIn', token)
        },
        signOut ({ commit }) {
            commit('signOut')
        }
    }
})
