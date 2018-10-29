const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
    res.json({
        greeting: 'hi'
    })
})

module.exports = router