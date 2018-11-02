const express = require('express')
const { createTodo, loadTodoList } = require('./controller')
const router = express.Router()

router.post('/read', loadTodoList)
router.post('/create', createTodo)
router.post('/delete')
router.post('/update')

module.exports = router
