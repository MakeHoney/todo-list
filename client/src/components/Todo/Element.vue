<template>
    <div class="todo-element">
        <div ref="elContainer" class="el-container">
            <p class="el-title" v-if="priority === 3">{{ title }}</p>
            <p class="el-title" v-else>{{ title }} [{{ calculStar }}]</p>
            <p class="el-desc">{{ description }}</p>
            <input type="checkbox" class="checkbox" v-model="isChecked" :value="_id">
            <p class="el-deadline" v-if="deadline">마감 날짜: {{ deadline }}</p>
            <b-btn class="hide-button" size="sm"></b-btn>
            <b-btn class="el-button" size="sm" v-if="!isExpired && !isComplete "@click="triggerUpdate">수정</b-btn>
            <b-btn class="el-button" size="sm" v-if="!isExpired && !isComplete" @click="triggerComplete">완료</b-btn>
        </div>
    </div>
</template>

<script>
    // 동일 컴포넌트간 데이터 공유 -> vuex로 해결
    // vue bootstrap checkbox 사용가능
    export default {
        name: 'todo-element',
        data () {
            return {
                isChecked: false
            }
        },
        computed: {
            calculStar () {
                if (this.priority === 0) return '★★★'
                else if(this.priority === 1) return '★★'
                else if(this.priority === 2) return '★'
                else return ''
            }
        },
        methods: {
            triggerUpdate () {
                this.$emit('updateTodo', this._id)
            },
            triggerComplete () {
                let elContainer = this.$refs['elContainer']
                this.$emit('completeTodo', this._id)
                elContainer.style.backgroundColor = 'red'
                this.$refs['elContainer'].style.textDecoration = 'line-through'
            }
        },
        watch: {
            isChecked () {
                let elContainer = this.$refs['elContainer']
                if(this.isChecked) {
                    this.$store.commit('addCheckedElement', this._id)
                    elContainer.style.backgroundColor = '#276DE9'
                } else {
                    this.$store.commit('deleteCheckedElement', this._id)
                    if (this.isExpired) {
                        elContainer.style.backgroundColor = '#7b7b7b'
                    } else if(this.isComplete) {
                        elContainer.style.backgroundColor = 'red'
                    } else {
                        elContainer.style.backgroundColor = '#cadbe9'
                    }
                }
            }
        },
        props: {
            _id: {
                type: String
            },
            title: {
                type: String
            },
            description: {
                type: String
            },
            priority: {
                type: Number
            },
            deadline: {
                type: String
            },
            isComplete: {
                type: Boolean
            },
            isExpired: {
                type: Boolean
            }
        },
        mounted() {
            if(this.isComplete) {
                this.$refs['elContainer'].style.backgroundColor = 'red'
                this.$refs['elContainer'].style.textDecoration = 'line-through'
            }
            if(this.isExpired) this.$refs['elContainer'].style.backgroundColor = '#7b7b7b'
        },
        beforeDestroy () {
            this.isChecked = false
        },
        destroyed () {
            this.isChecked = false
        }
    }
</script>

<style scoped>
    .el-container {
        background-color: #cadbe9;
        padding: 10px 0 10px 0;
        margin: 10px auto 10px auto;
        border-radius: 5px;
    }
    .el-title {
        font-weight: bold;
        text-align: left;
        margin: auto auto auto 10px;
    }
    .el-desc {
        text-align: left;
        margin: auto auto auto 10px;
    }
    .el-deadline {
        font-size: 10px;
        text-align: right;
        margin: auto 30px auto auto;
    }
    .checkbox {
        float: right;
        margin: auto 10px auto 10px;
    }
    .el-button {
        background-color: #648dd1;
        border-color: #648dd1;
        margin: 4px 0 4px 0;
        width: 90%;
    }
    .hide-button {
        visibility: hidden;
    }
</style>
