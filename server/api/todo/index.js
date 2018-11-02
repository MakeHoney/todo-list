const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
    res.json({
        greeting: 'hi'
    })
})

router.post('/create')
router.post('/delete')
router.post('/update')

module.exports = router
