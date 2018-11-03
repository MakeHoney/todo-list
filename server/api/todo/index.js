const express = require('express')
const { createTodo, loadTodoList, deleteTodo } = require('./controller')
const router = express.Router()

router.post('/read')
router.post('/read-all', loadTodoList)
router.post('/create', createTodo)
router.post('/delete', deleteTodo)
router.post('/update')

module.exports = router
