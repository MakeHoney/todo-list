<template>
    <div class="todo-element">
        <div class="el-container">
            <p class="el-title">{{ title }} [{{ calculStar }}]</p>
            <p class="el-desc">{{ description }}</p>
            <input type="checkbox" id="checkbox" v-model="isChecked">
            <p class="el-deadline">마감 날짜: {{ deadline }}</p>
            <b-btn class="el-button" size="sm">수정</b-btn>
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
                else return '★'
            }
        },
        watch: {
            isChecked () {
                let elContainer = this.$el.querySelector('.el-container')
                if(this.isChecked) {
                    elContainer.style.backgroundColor = '#276DE9'
                } else {
                    elContainer.style.backgroundColor = '#cadbe9'
                }
            }
        },
        props: {
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
    #checkbox {
        float: right;
        margin: auto 10px auto auto;
    }
    .el-button {
        background-color: #648dd1;
        border-color: #648dd1;
        width: 90%;
    }
</style>
