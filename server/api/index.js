const express = require('express')
const router = express.Router()

router.use('/home', require('./home'))
router.use('/auth', require('./auth'))
router.use('/test', require('./db-test'))

module.exports = router
