const express = require('express')
const router = express.Router()

router.use('/todo', require('./todo'))
router.use('/auth', require('./auth'))

module.exports = router
