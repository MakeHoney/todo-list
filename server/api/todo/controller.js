const Todo = require('../../models/todo')

exports.createTodo = async (req, res) => {
    const { formData } = req.body
    const createTodo = formData => {
        Todo.create(formData)
    }

    try {
        await createTodo(formData)
        res.json({
            message: 'success'
        })
    } catch (err) {
        res.status(409).json({
            message: err.message
        })
    }
}

exports.loadTodoList = async (req, res) => {
    const { uid } = req.body
    const todoList = await Todo.findTodosByUID(uid)
    res.json({
        todoList
    })
}
