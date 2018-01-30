import { Client, Pool } from 'pg'

import { IpFilter } from 'express-ipfilter'
import { constructQuery } from './orm'
import express from 'express'
import helmet from 'helmet'
import postgraphql from 'postgraphql'

const PORT = process.env.PORT || 5000
const DATABASE_URL = process.env.DATABASE_URL || 'postgres://skillz@localhost/skillz'
const IP_WHITELIST = (process.env.IP_WHITELIST || '127.0.0.1').split(',')

const client = new Client({ connectionString: DATABASE_URL })


export const app = express()

app.use(helmet())
app.use(express.json())
app.use(IpFilter(IP_WHITELIST, {
    allowedHeaders: 'X-Forwarded-For',
    excluding: '/',
    logLevel: 'deny',
    mode: 'allow',
}))
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})
app.use(postgraphql(DATABASE_URL, { graphiql: true }))

app.get('/', (req, res) => res.send('Hello World!'))


app.post('/person/:personId/skill/:skillId/', async (req, res) => {
    let { personId, skillId } = req.params
    let data = req.body
    const { update, insert, params } = constructQuery({
        tableName: 'person_skill',
        where: { person_id: personId, skill_id: skillId },
        cols: ['experience', 'interest'],
        data
    })
    const { rowCount } = await client.query(update, params)
    if (rowCount == 0) {
        await client.query(insert, params)
    }
    res.json(data)
})

export const connect_database = async () => {
    try {
        client.connect()
    } catch (err) {
        console.error(`pg client connect: ${err.error}`)
        process.exit(1)
    }
}

const start = async () => {
    await client.connect()
    console.log(`Connected to ${DATABASE_URL}`)
    app.listen(PORT, () => console.log(`API server listening on port ${PORT}.`))
}


if (require.main === module) {
    start()
}
