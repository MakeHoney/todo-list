<template>
    <div class="todo-main">
        <div class="todo-container">
            <div v-if="!todoList.length">
                <h5>{{ formData.ownerUID }} 님!</h5>
                <h3>리스트를 등록해주세요!</h3>
            </div>
            <div v-for="todo in todoList" :key="todo._id">
                <todo-element class="toElem"
                              v-on:updateTodo="loadTodo"
                              v-on:completeTodo="completeTodo"
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
        <b-btn class="button-main" @click="triggerEmptyForm()">Todo 등록</b-btn>
        <b-btn class="button-main" @click="sortListByPriority()">우선순위 정렬</b-btn>
        <b-btn class="button-main" @click="deleteExpiredTodo()">만료된 Todo 삭제</b-btn>
        <!--// checked 일때만 버튼 보이기-->
        <b-btn class="button-main"  v-if="emptyCheck"
                                            @click="deleteCheckedTodo()">선택된 Todo 삭제</b-btn>

        <b-modal ref="createForm" size="lg" hide-footer title="정보 입력">
            <!-- 입력 안된 경우 예외처리 -->
            <!-- 모달 child component로 빼기 -->
            <form @submit.prevent="submitTodoForm(formData)">
                <b-input-group prepend="제목">
                    <b-form-input v-model="formData.title"/>
                </b-input-group>
                <b-form-textarea id="todo-desc"
                                 placeholder="Todo의 내용을 입력해주세요."
                                 :rows="3"
                                 :max-rows="6"
                                 v-model="formData.description">
                </b-form-textarea>

                <div id="todo-priority">
                    <label for="todo-priority">중요도</label>
                    <input type="radio" id="high" value="0" v-model="formData.priority">
                    <label for="high">★★★</label>
                    <input type="radio" id="mid" value="1" v-model="formData.priority">
                    <label for="mid">★★</label>
                    <input type="radio" id="low" value="2" v-model="formData.priority">
                    <label for="low">★</label>
                </div>
                <label for="use-deadline">마감 날짜 지정</label>
                <input type="radio" id="use-deadline" value="yes" v-model="useDeadline">
                <input type="date" id="todo-deadline" v-if="useDeadline"
                                                      v-model="formData.deadline">
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
                },
                useDeadline: '',
                showSortedResult: false
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
                'submitFor',
                'selectedElementTID'
            ])
        },
        methods: {
            triggerForm() {
                this.$refs.createForm.show()
                this.$store.commit('setSubmitFor', 'update')
            },
            triggerEmptyForm () {
                this.resetForm()
                this.formData.isComplete = false
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

                if(!formInstance.deadline) formInstance.isExpired = false

                this.submitFor === 'create'
                ? await this.$store.dispatch('createTodo', formInstance)
                : await this.$store.dispatch('updateTodo',
                    {
                        tid: this.selectedElementTID,
                        formData: formInstance
                    })

                this.loadTodoList()
                this.$refs.createForm.hide()
                this.resetForm()
            },
            async deleteCheckedTodo () {
                await this.$store.dispatch('deleteTodo', this.checkedElements)
                this.loadTodoList()
            },
            async deleteExpiredTodo () {
                const elements = this.todoList.filter(todoObj => todoObj.isExpired)
                let expiredElemObj = {}
                elements.forEach(elem => {
                    expiredElemObj[elem._id] = elem._id
                })
                await this.$store.dispatch('deleteTodo', expiredElemObj)
                this.loadTodoList()
            },
            async loadTodoList() {
                await this.$store.dispatch('loadTodoList', this.formData.ownerUID)
                console.log(this.$store.state.todoList)
            },
            async loadTodo(tid) {
                let todo = await this.$store.dispatch('loadTodo', tid)
                this.formData.title = todo.title
                this.formData.description = todo.description
                this.formData.priority = todo.priority
                this.formData.deadline = todo.deadline
                !this.formData.deadline
                ? this.useDeadline = ''
                : this.useDeadline = 'yes'
                this.triggerForm()
            },
            resetForm () {
                this.useDeadline = ''
                this.formData.title = ''
                this.formData.description = ''
                this.formData.priority = 3
                this.formData.deadline = ''
            },
            sortListByPriority () {
                let comp = (a, b) => {
                    if(a.priority < b.priority) return -1
                    else if(a.priority > b.priority) return 1
                    else return 0
                }
                this.todoList.sort(comp)
            },
            async completeTodo (tid) {
                let todo = await this.$store.dispatch('loadTodo', tid)
                this.formData.title = todo.title
                this.formData.description = todo.description
                this.formData.priority = 3
                this.formData.deadline = todo.deadline
                this.formData.isComplete = true
                await this.$store.dispatch('updateTodo', {
                    tid,
                    formData: this.formData
                })
                this.loadTodoList()
                this.formData.isComplete = false
                this.resetForm()
            }
        },
        async created () {
            this.loadTodoList()
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
    .button-main {
        display: block;
        margin: 10px auto 10px auto;
        width: 60%;
    }
    #todo-deadline,
    #todo-desc,
    #todo-priority,
    #submit {
        display: block;
        margin-top: 10px;
    }
    #submit {
        display: block;
        width: 100%;
        margin-top: 10px;
        padding: 3px;
        border: none;
        border-radius: 10px;
        background-color: #e1e1e1;
    }
    #todo-desc {
        margin: 10px auto 10px auto;
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
