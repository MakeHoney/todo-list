import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import config from '../config'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userInfo: {
            uid: localStorage.getItem('uid'),
            accessToken: localStorage.getItem('accessToken')
        },
        todoList: [],
        checkedElements: {}
    },
    getters: {
        accessToken: state => state.userInfo.accessToken,
        uid: state => state.userInfo.uid,
        todoList: state => state.todoList,
        checkedElements: state => state.checkedElements
    },
    mutations: {
        signIn (state, { uid, token }) {
            state.userInfo.accessToken = token
            state.userInfo.uid = uid
            localStorage.setItem('accessToken', token)
            localStorage.setItem('uid', uid)
        },
        signOut (state) {
            state.userInfo.accessToken = null
            state.userInfo.uid = ''
            localStorage.removeItem('accessToken')
            localStorage.removeItem('uid')
        },
        setTodoList (state, list) {
            state.todoList = list
        },
        addCheckedElement (state, _id) {
            state.checkedElements[_id] = _id
        },
        deleteCheckedElement (state, _id) {
            delete state.checkedElements[_id]
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
        },
        async loadTodoList({ commit }, uid) {
            let url = `${config.API_URI}/todo/read`
            try {
                let { data } = await axios.post(url, { uid })
                commit('setTodoList', data.todoList)
            } catch (err) {
                throw err
            }
        },
        async createTodo ({ commit }, formData) {
            let url = `${config.API_URI}/todo/create`
            try {
                await axios.post(url, { formData })
            } catch (err) {
                throw err
            }
        },
        async deleteTodo({ commit }, elements) {
            let url = `${config.API_URI}/todo/delete`
            try {
                await axios.post(url, { elements })
            } catch (err) {
                throw err
            }
            for (let key in elements) {
                delete elements[key]
            }
        }
    }
})
