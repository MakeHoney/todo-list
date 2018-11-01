<template>
    <div class="sign-in">
        <div class="login-form">
            <h2>로그인</h2>
            <form @submit.prevent="onSubmit(userInfo)">
                <input type="text" placeholder="아이디" id="uid" v-model="userInfo.uid">
                <input type="password" placeholder="비밀번호" id="password" v-model="userInfo.password">
                <input type="submit" id="submit" value="로그인">
                <router-link :to="{ name: 'sign-up' }">회원가입</router-link>
            </form>
        </div>
        <b-modal ref="authFailed" size="sm" hide-footer title="로그인 실패">
            <div class="d-block text-center">
                잘못된 정보입니다!
            </div>
        </b-modal>
    </div>
</template>

<script>
export default {
    name: 'sign-in',
    data () {
        return {
            userInfo: {
                uid: '',
                password: '',
            }
        }
    },
    methods: {
        async onSubmit (userInfo) {
            try {
                await this.$store.dispatch('signIn', userInfo)
            } catch (err) {
                [this.userInfo.uid, this.userInfo.password] = ['']
                this.$refs.authFailed.show()
            }
        }
    }
}
</script>

<style scoped>
    .login-form {
        background-color: #e4e3e4;
        border-radius: 25px;
        text-align: center;
        width: 50%;
        height: 70%;
        padding: 50px;
        margin: 40px auto;
    }
    #uid, #password {
        display: block;
        padding: 10px;
        margin: 10px auto 10px auto;
        width: 100%;
    }
    #submit {
        display: block;
        margin: 10px auto 10px auto;
        padding: 0 10px 0 10px;
    }
</style>
