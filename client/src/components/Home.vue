<template>
    <div class="home">
        <div v-if="!accessToken">
            <sign-in/>
        </div>
        <div v-else>
            <todo/>
        </div>
    </div>
</template>

<script>
import SignIn from './SignIn'
import Todo from './Todo/Main'
import { mapGetters } from 'vuex'
export default {
    name: 'home',
    computed: {
        ...mapGetters([
            'accessToken'
        ])
    },
    components: {
        SignIn,
        Todo
    },
    async created () {
    }
}
</script>
