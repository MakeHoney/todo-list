const express = require('express')
const router = express.Router()

router.post('/', (req, res, next) => {
    console.log(req.body.uid)
    res.send('hi')
})

module.exports = router