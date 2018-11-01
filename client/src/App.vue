<template>
  <div id="app">
    <div id="nav">
        <a href="#" @click="signOut" v-if="accessToken">Sign out</a>
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

</style>
