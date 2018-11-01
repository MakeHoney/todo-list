<template>
    <div class="todo-element">
        <div class="el-container">
            {{ inputData }}
        </div>
    </div>
</template>

<script>
    export default {
        name: 'todo-element',
        props: {
            inputData: {
                type: String
            }
        }
    }
</script>

<style scoped>
    .el-container {
        background-color: #cadbe9;
        padding: 50px 0 50px 0;
        margin: 10px auto 10px auto;
        border-radius: 5px;
    }
</style>
