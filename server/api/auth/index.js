const express = require('express')
const { register } = require('./controller')
const router = express.Router()

router.post('/sign-in')
router.post('/sign-up', register)

module.exports = router