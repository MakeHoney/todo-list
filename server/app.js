const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const homeRouter = require('./api/home/router')
const signInRouter = require('./api/signIn/router')
const signUpRouter = require('./api/signUp/router')

let app = express()

app.set('port', process.env.PORT || 8888)

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ urlencoded: true }))

app.use('/home', homeRouter)
app.use('/sign-in', signInRouter)
app.use('./sign-up', signUpRouter)

app.listen(app.get('port'), () => {
    console.log(`Server Running on port ${app.get('port')}`)
})

