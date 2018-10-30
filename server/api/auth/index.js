const express = require('express')
const { register, signIn } = require('./controller')
const router = express.Router()

router.post('/sign-in', signIn)
router.post('/sign-up', register)
router.get('/auth-check')

module.exports = router