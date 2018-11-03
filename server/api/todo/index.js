const express = require('express')
const router = express.Router()
const {
    createTodo,
    loadTodoList,
    deleteTodo,
    loadTodo,
    updateTodo
} = require('./controller')

router.post('/read', loadTodo)
router.post('/read-all', loadTodoList)
router.post('/create', createTodo)
router.post('/delete', deleteTodo)
router.post('/update', updateTodo)

module.exports = router
