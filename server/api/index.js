const express = require('express')
const router = express.Router()

router.use('/home', require('./home'))
router.use('/sign-in', require('./sign-in'))
router.use('/sign-up', require('./sign-up'))

module.exports = router
