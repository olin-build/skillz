import express from 'express'
import helmet from 'helmet'
import postgraphql from 'postgraphql'

const app = express()

app.use(helmet())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

app.use(postgraphql('postgres://skillz@localhost/skillz'))

app.listen(5000)
