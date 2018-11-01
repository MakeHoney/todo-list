<template>
  <div id="app">
    <div id="nav">
        <a href="#" @click="signOut" v-if="accessToken">Sign out</a>
    </div>
    <router-view/>
  </div>
</template>
<script>
    export default {
        methods: {
            signOut () {
                this.$store.commit('signOut')
            }
        },
        computed: {
            accessToken () {
                return this.$store.state.accessToken
            }
        }
    }
</script>
<style>

</style>
