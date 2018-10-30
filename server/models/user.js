const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
    uid: String,
    password: String
})

User.statics.create = function (uid, password) {
    console.log(User)
    const user = new this({
        uid,
        password
    })
    return user.save()
}

User.statics.findOneByUID = function (uid) {
    return this.findOne({
        uid
    })
}

User.methods.verify = function (password) {
    return this.password === password
}

module.exports = mongoose.model('User', User)
