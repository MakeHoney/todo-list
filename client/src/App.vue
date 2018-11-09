<template>
  <div id="app">
      <div id="nav">
          <h1 id="title">TODO_LIST</h1>
          <a href="#" @click="signOut" v-if="accessToken">로그아웃</a>
      </div>
      <router-view/>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex'
    export default {
        methods: {
            signOut () {
                this.$store.commit('signOut')
            }
        },
        computed: {
            ...mapGetters([
                'accessToken'
            ])
        }
    }
</script>

<style>
    #title {
        text-align: center;
        font-weight: bold;
        padding: 10px;
        margin-top: 10px;
    }
    #nav {
        background-color: #6aafe6;
        padding: 50px;
        text-align: right;
    }
</style>
