const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const testRouter = require('./api/test')

let app = express()

app.set('port', process.env.PORT || 8888)

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ urlencoded: true }))

app.use('/home', testRouter)

app.listen(app.get('port'), () => {
    console.log(`Server Running on port ${app.get('port')}`)
})

