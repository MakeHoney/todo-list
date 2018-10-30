const mongoose = require('mongoose')
const { encrypt } = require('../utils/encrypt')
const Schema = mongoose.Schema

const User = new Schema({
    uid: String,
    password: String,
    todo: {
        list: []
    }
})

// don't use arrow func: no lexical scope!
User.statics.create = function (uid, password) {
    const user = new this({
        uid,
        password: encrypt(password)
    })
    return user.save()
}

// statics -> for class
User.statics.findOneByUID = function (uid) {
    return this.findOne({
        uid
    })
}

// methods -> for specific instance
User.methods.verify = function (password) {
    return this.password === encrypt(password)
}

module.exports = mongoose.model('User', User)
