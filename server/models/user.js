const mongoose = require('mongoose')
const { encrypt } = require('../utils/encrypt')
const Schema = mongoose.Schema

const User = new Schema({
    uid: String,
    password: String,
    todo: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})
/**
 * don't use arrow func: no lexical scope!
 */

// statics -> for class
User.statics.create = function (uid, password) {
    const user = new this({
        uid,
        password: encrypt(password)
    })
    // console.log(user)
    return user.save()
}

User.statics.findOneByUID = async function (uid) {
    // let a = await this.findOne({uid})
    // console.log(a.todo)
    return this.findOne({
        uid
    })
}

// methods -> for specific instance
User.methods.verify = function (password) {
    return this.password === encrypt(password)
}

User.methods.createTodo = function ({
    title,
    description,
    deadline,
    priority
}) {
    // daedline 설정
    let foo
    this.todo.list.push({
        title,
        description,
        isComplete: false,
        deadline,
        priority,
        isExpired: 0
    })
}

module.exports = mongoose.model('User', User)
