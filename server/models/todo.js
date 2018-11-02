const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Todo = new Schema({
    title: String,
    description: String,
    deadline: String,
    priority: Number,
    isComplete: Boolean,
    isExpired: Boolean,
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
})

Todo.statics.create = function (formData) {

    const todo = new this(formData)
}
