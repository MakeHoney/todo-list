<template>
    <div class="home">
        <div v-if="!accessToken">
            <sign-in/>
        </div>
        <div v-else>
            <h2>Home</h2>
        </div>
    </div>
</template>

<script>
import SignIn from './SignIn'
export default {
    name: 'home',
    data () {
        return {
        }
    },
    computed: {
        accessToken () {
            return this.$store.getters.accessToken
        }
    },
    components: {
        SignIn
    },
    async created () {
    }
}
</script>
