<template>
    <div class="todo-main">
        <div class="todo-container">
            <h1 id="my-todo-title">My List</h1>
            <div v-for="tempBuf in tempBufs">
                <todo-element :inputData="tempBuf.inputData"></todo-element>
            </div>
        </div>
        <b-btn class="form-trigger-button" @click="triggerForm()">Todo 등록</b-btn>

        <b-modal ref="createForm" size="lg" hide-footer title="정보 입력">
            <form @submit.prevent="onSubmit(formData)">
                <label>input data</label>
                <input type="text" id="input-data" v-model="formData.inputData">
                <input type="submit" id="submit" value="완료">
            </form>
        </b-modal>
    </div>
</template>

<script>
    import TodoElement from './Element'
    export default {
        name: 'todo-main',
        data () {
            return {
                tempBufs: [],
                formData: {
                    inputData: ''
                }
            }
        },
        components: {
            TodoElement
        },
        methods: {
            triggerForm () {
                this.$refs.createForm.show()
            },
            onSubmit(formData) {
                let formInstance = Object.assign({}, formData)
                this.tempBufs.push(formInstance)
                this.$refs.createForm.hide()
                this.formData.inputData = ''
            }
        }
    }
</script>

<style scoped>
    #my-todo-title {
        padding-bottom: 5%;
    }
    .todo-container {
        position: relative;
        border-radius: 15px;
        background-color: #8ec0e4;
        text-align: center;
        margin: 20px auto 20px auto;
        padding: 5%;
        width: 60%;
    }
    .form-trigger-button {
        display: block;
        margin: 20px auto 20px auto;
        width: 60%;
    }
    #input-data, #submit {
        display: block;
    }
</style>
