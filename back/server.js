import { Client, Pool } from 'pg'

import express from 'express'
import helmet from 'helmet'
import postgraphql from 'postgraphql'

const PORT = process.env.PORT || 5000
const DATABASE_URL = process.env.DATABASE_URL || 'postgres://skillz@localhost/skillz'

const client = new Client({ connectionString: DATABASE_URL })
client.connect().catch(err => {
    console.error('pg client connect:', err)
    process.exit(1)
})

const app = express()

app.use(helmet())
app.use(express.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})
app.use(postgraphql(DATABASE_URL, { graphiql: true }))

function constructQuery({ tableName, where, cols, data }) {
    var updates = []
    var whereClause = []
    var vars = []
    Object.keys(where).forEach(name => {
        vars.push(where[name])
        whereClause.push(`${name}=$${vars.length}`)
    })
    cols.forEach(name => {
        const val = data[name]
        if (val !== undefined) {
            vars.push(val)
            updates.push(`${name}=$${vars.length}`)
        }
    })
    const update = `UPDATE ${tableName}
        SET ${updates.join(', ')}
        WHERE ${whereClause.join(' AND ')}
        `.replace(/\n */g, ' ')
    const insert = `INSERT INTO ${tableName}
        (${whereClause.concat(updates).join(', ').replace(/=\$\d+/g, '')})
        VALUES (${whereClause.concat(updates).map((_, i) => '$' + (i + 1)).join(', ')})
        `.replace(/\n */g, ' ')
    return { update, insert, vars }
}

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/person/:personId/skill/:skillId/', async (req, res) => {
    let { personId, skillId } = req.params
    let data = req.body
    // console.info('set', req.params, data)
    const { update, insert, vars } = constructQuery({
        tableName: 'person_skill',
        where: { person_id: personId, skill_id: skillId },
        cols: ['experience', 'desire'],
        data
    })
    const { rowCount } = await client.query(update, vars)
    if (rowCount == 0) {
        await client.query(insert, vars)
    }
    res.json(data)
})

app.listen(PORT, () => console.log(`API server listening on port ${PORT}.`))
