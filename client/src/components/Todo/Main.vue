<template>
    <div class="todo-main">
        <div class="todo-container">
            <h5 v-if="!todoList.length">리스트를 등록해주세요!</h5>
            <div v-for="todo in todoList" :key="todo._id">
                <todo-element class="toElem" v-on:updateTodo="loadTodo"
                                             :_id="todo._id"
                                             :title="todo.title"
                                             :description="todo.description"
                                             :priority="todo.priority"
                                             :deadline="todo.deadline"
                                             :isComplete="todo.isComplete"
                                             :isExpired="todo.isExpired">
                </todo-element>
            </div>
        </div>
        <b-btn class="form-trigger-button" @click="triggerEmptyForm()">Todo 등록</b-btn>
        <!--// checked 일때만 버튼 보이기-->
        <b-btn class="form-trigger-button"  v-if="emptyCheck"
                                            @click="deleteCheckedTodo()">삭제</b-btn>
        <b-btn @click="deleteExpiredTodo()">abc</b-btn>
        {{ formData.ownerUID }}
        {{ emptyCheck }}

        <b-modal ref="createForm" size="lg" hide-footer title="정보 입력">
            <!-- 입력 안된 경우 예외처리 -->
            <!-- 모달 child component로 빼기 -->
            <form @submit.prevent="submitTodoForm(formData)">
                <label for="todo-title">제목</label>
                <input type="text" id="todo-title" v-model="formData.title">
                <label for="todo-desc">내용</label>
                <textarea id="todo-desc" placeholder="상세 내용을 입력해주세요!" v-model="formData.description"></textarea>
                <label for="todo-priority">중요도</label>
                <div id="todo-priority">
                    <input type="radio" id="high" value="0" v-model="formData.priority">
                    <label for="high">★★★</label>
                    <input type="radio" id="mid" value="1" v-model="formData.priority">
                    <label for="mid">★★</label>
                    <input type="radio" id="low" value="2" v-model="formData.priority">
                    <label for="low">★</label>
                </div>
                <input type="date" id="todo-deadline" value="2018-01-01" v-model="formData.deadline">
                <input type="submit" id="submit" value="완료">
            </form>
        </b-modal>
    </div>
</template>

<script>
    import TodoElement from './Element'
    import { mapGetters } from 'vuex'
    export default {
        name: 'todo-main',
        data () {
            return {
                formData: {
                    title: '',
                    description: '',
                    deadline: '',
                    priority: 3,
                    isComplete: false,
                    isExpired: false,
                    ownerUID: this.$store.getters.uid
                }
            }
        },
        components: {
            TodoElement
        },
        computed: {
            ...mapGetters([
                'todoList',
                'checkedElements',
                'emptyCheck',
                'submitFor'
            ])
        },
        methods: {
            triggerForm() {
                this.$refs.createForm.show()
                this.$store.commit('setSubmitFor', 'update')
            },
            triggerEmptyForm () {
                this.resetForm()
                this.triggerForm()
                this.$store.commit('setSubmitFor', 'create')
            },
            async submitTodoForm(formData) {
                let formInstance = Object.assign({}, formData)
                formInstance.priority = parseInt(formInstance.priority)
                let yyyymmdd = formInstance.deadline.split('-')
                let intDate = (new Date(yyyymmdd[0], yyyymmdd[1] - 1, yyyymmdd[2])).getTime()

                intDate > Date.now()
                ? formInstance.isExpired = false
                : formInstance.isExpired = true

                this.submitFor === 'create'
                ? await this.$store.dispatch('createTodo', formInstance)
                : await this.$store.dispatch('createTodo', formInstance)

                await this.loadTodoList()
                this.$refs.createForm.hide()
                this.resetForm()
            },
            async deleteCheckedTodo () {
                await this.$store.dispatch('deleteTodo', this.checkedElements)
                await this.loadTodoList()
            },
            async deleteExpiredTodo () {
                const elements = this.todoList.filter(todoObj => todoObj.isExpired)
                let expiredElemObj = {}
                elements.forEach(elem => {
                    expiredElemObj[elem._id] = elem._id
                })
                await this.$store.dispatch('deleteTodo', expiredElemObj)
                await this.loadTodoList()
            },
            async loadTodoList() {
                await this.$store.dispatch('loadTodoList', this.formData.ownerUID)
            },
            async loadTodo(tid) {
                let todo = await this.$store.dispatch('loadTodo', tid)
                this.formData.title = todo.title
                this.formData.description = todo.description
                this.formData.priority = todo.priority
                this.formData.deadline = todo.deadline

                console.log(this.formData)
                this.triggerForm()
            },
            resetForm () {
                this.formData.title = ''
                this.formData.description = ''
                this.formData.priority = -1
                this.formData.deadline = ''
                this.isComplete = false
                this.isExpired = false
            }
        },
        async created () {
            await this.loadTodoList()
        },
        async updated () {
            // await this.loadTodoList()
        }
    }
</script>

<style scoped>
    .todo-container {
        border-radius: 15px;
        background-color: #8ec0e4;
        text-align: center;
        margin: 40px auto 20px auto;
        padding: 50px;
        width: 60%;
    }
    .form-trigger-button {
        display: block;
        margin: 20px auto 20px auto;
        width: 60%;
    }
    #todo-title,
    #todo-desc,
    #todo-priority,
    #submit {
        display: block;
    }
    .toElem {
        transform: scale(1);
        -webkit-transform: scale(1);
        -moz-transform: scale(1);
        -ms-transform: scale(1);
        -o-transform: scale(1);
        transition: all 0.1s ease-in-out;
    }
    .toElem:hover {
        transform: scale(1.05);
        -webkit-transform: scale(1.05);
        -moz-transform: scale(1.05);
        -ms-transform: scale(1.05);
        -o-transform: scale(1.05);
    }
</style>
