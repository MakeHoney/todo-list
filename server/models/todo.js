const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Todo = new Schema({
    title: String,
    description: String,
    deadline: String,
    priority: Number,
    isComplete: Boolean,
    isExpired: Boolean,
    ownerUID: String
})

Todo.statics.create = function (formData) {
    const todo = new this(formData)
    todo.save()
}

Todo.statics.findTodosByUID = async function (uid) {
    return await this.find({
        ownerUID: uid
    })
}

module.exports = mongoose.model('Todo', Todo)
