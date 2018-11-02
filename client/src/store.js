import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import config from '../config'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userInfo: {
            _id: localStorage.getItem('_id'),
            accessToken: localStorage.getItem('accessToken')
        }
    },
    getters: {
        accessToken: state => state.userInfo.accessToken,
        _id: state => state.userInfo._id
    },
    mutations: {
        signIn (state, { _id, token }) {
            state.userInfo.accessToken = token
            state.userInfo._id = _id
            localStorage.setItem('accessToken', token)
            localStorage.setItem('_id', _id)
        },
        signOut (state) {
            state.userInfo.accessToken = null
            state.userInfo._id = ''
            localStorage.removeItem('accessToken')
            localStorage.removeItem('_id')
        }
    },
    actions: {
        async signIn ({ commit }, { uid, password }) {
            let url = `${config.API_URI}/auth/sign-in`
            try {
                let { data } = await axios.post(url, { uid, password })
                commit('signIn', data)
            } catch (err) {
                throw err
            }
        },
        async signUp ({ commit }, { uid, password }) {
            let url = `${config.API_URI}/auth/sign-up`
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
