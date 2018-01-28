// poor-person's ORM

// FIXME callers should use an upsert, instead
export function constructQuery({ tableName, where, cols, data }) {
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
    const update = collapseWhitespace(`UPDATE ${tableName}
        SET ${updates.join(', ')}
        WHERE ${whereClause.join(' AND ')}
        `)
    const insert = collapseWhitespace(`INSERT INTO ${tableName}
        (${whereClause.concat(updates).join(', ').replace(/=\$\d+/g, '')})
        VALUES (${whereClause.concat(updates).map((_, i) => '$' + (i + 1)).join(', ')})
        `)
    return { update, insert, vars }
}

const collapseWhitespace = (str) =>
    str.replace(/\n */g, ' ').replace(/\s+$/, '')
