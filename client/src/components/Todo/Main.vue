<template>
    <div class="todo-main">
        <div class="todo-container">
            <h5 v-if="!todoList.length">리스트를 등록해주세요!</h5>
            <div v-for="todo in todoList" :key="todo._id">
                <todo-element class="toElem" :_id="todo._id"
                                             :title="todo.title"
                                             :description="todo.description"
                                             :priority="todo.priority"
                                             :deadline="todo.deadline"
                                             :isComplete="todo.isComplete"
                                             :isExpired="todo.isExpired"></todo-element>
            </div>
        </div>
        <b-btn class="form-trigger-button" @click="triggerForm()">Todo 등록</b-btn>
        <!--// checked 일때만 버튼 보이기-->
        <b-btn class="form-trigger-button" @click="deleteCheckedTodo()">삭제</b-btn>
        {{ formData.ownerUID }}

        <b-modal ref="createForm" size="lg" hide-footer title="정보 입력">
            <!-- 입력 안된 경우 예외처리 -->
            <!-- 모달 child component로 빼기 -->
            <form @submit.prevent="submitCreateTodoForm(formData)">
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
    export default {
        name: 'todo-main',
        data () {
            return {
                todoList: [],
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
        methods: {
            triggerForm () {
                this.$refs.createForm.show()
            },
            async submitCreateTodoForm(formData) {
                let formInstance = Object.assign({}, formData)
                formInstance.priority = parseInt(formInstance.priority)
                let yyyymmdd = formInstance.deadline.split('-')
                let intDate = (new Date(yyyymmdd[0], yyyymmdd[1] - 1, yyyymmdd[2])).getTime()

                intDate > Date.now()
                ? formInstance.isExpired = false
                : formInstance.isExpired = true

                await this.$store.dispatch('createTodo', formInstance)
                this.todoList.push(formInstance)
                this.$refs.createForm.hide()

                this.resetForm()
            },
            async deleteCheckedTodo () {
                const checkedTodoList = this.$store.state.checkedElements
                await this.$store.dispatch('deleteTodo', checkedTodoList)
            },
            async loadTodoList() {
                await this.$store.dispatch('loadTodoList', this.formData.ownerUID)
                this.todoList = this.$store.getters.todoList
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
        async beforeUpdate () {
            await this.loadTodoList()
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
