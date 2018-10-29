<template>
    <div>
        <h2>Sign In</h2>
        <form @submit.prevent="onSubmit(uid, password)">
            <input type="text" v-model="uid" placeholder="아이디">
            <input type="password" v-model="password" placeholder="비밀번호">
            <input type="submit" value="로그인">
        </form>
    </div>
</template>
<script>
export default {
    name: 'SignIn',
    data () {
        return {
            uid: '',
            password: ''
        }
    },
    methods: {
        async onSubmit (uid, password) {
            await this.$store.dispatch('signIn', { uid, password })
            // redirect ?
            // this.redirect()
            this.$router.push('home')
        }
    }
}
</script>

