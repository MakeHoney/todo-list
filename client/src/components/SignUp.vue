<template>
    <div class="sign-up">
        <div class="signup-form">
            <h3 class="signup-title">회원가입</h3>
            <form @submit.prevent="onSubmit(uid, password)">
                <input type="text" placeholder="아이디" id="uid" v-model="uid">
                <input type="password" placeholder="비밀번호" id="password" v-model="password">
                <input type="submit" id="submit" value="가입">
                <router-link :to="{ name: 'home' }">돌아가기</router-link>
            </form>
        </div>
        <b-modal ref="signUpFailed" size="sm" hide-footer title="회원가입 실패">
            <div class="d-block text-center" v-if="uid && password">
                이미 존재하는 아이디입니다!
            </div>
            <div class="d-block text-center" v-else>
                올바른 값을 입력해주세요!
            </div>
        </b-modal>

    </div>
</template>
<script>
    /**
     * 로그인 상태에서 회원가입 진입시 리디렉션하기
     * */
export default {
    name: 'sign-up',
    data () {
        return {
            uid: '',
            password: ''
        }
    },
    methods: {
        async onSubmit (uid, password) {
            try {
                if (!uid || !password) {
                    [this.uid, this.password] = ['']
                    this.$refs.signUpFailed.show()
                } else {
                    await this.$store.dispatch('signUp', {uid, password})
                    this.$router.push({name: 'home'})
                }
            } catch (err) {
                this.$refs.signUpFailed.show()
            }
        }
    }
}
</script>

<style scoped>
    .signup-form {
        background-color: #e4e3e4;
        border-radius: 25px;
        text-align: center;
        width: 80%;
        height: 70%;
        padding: 10px;
        margin: 40px auto;
    }
    #uid, #password {
        display: block;
        padding: 10px;
        border-radius: 10px;
        border: none;
        margin: 10px auto 10px auto;
        width: 100%;
    }
    #submit {
        display: block;
        margin: 10px auto 10px auto;
        padding: 0 10px 0 10px;
    }
    .signup-title {
        padding: 10px;
    }
</style>
