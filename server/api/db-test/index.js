const express = require('express')
const router = express.Router()
const User = require('../../models/user')

router.post('/insert', (req, res, next) => {
    let { uid, password } = req.body
    console.log(uid, password)
    User.create(uid, password)
    res.json({result: 'success'})
})

module.exports = router