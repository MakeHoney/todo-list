const Todo = require('../../models/todo')
const mongoose = require('mongoose')

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

exports.deleteTodo = async (req, res) => {
    let { elements } = req.body
    for (let key in elements) {
        try {
            await Todo.find({_id: mongoose.Types.ObjectId(elements[key])}).remove()
        } catch (err) {
            res.status(409).json({
                message: err.messgae
            })
        }
    }
    res.json({
        message: 'success'
    })
}

exports.loadTodo = async (req, res) => {
    let { tid } = req.body
    const todo = await Todo.findTodoByTID(tid)
    res.json({
        todo
    })
}
