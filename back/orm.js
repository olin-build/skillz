// poor-person's ORM

// FIXME callers should use an upsert, instead
export function constructQuery({ tableName, where, cols, data }) {
    var updates = []
    var whereTests = []
    var params = []
    Object.keys(where).forEach(name => {
        params.push(where[name])
        whereTests.push(`${name}=$${params.length}`)
    })
    cols.forEach(name => {
        const val = data[name]
        if (val !== undefined) {
            params.push(val)
            updates.push(`${name}=$${params.length}`)
        }
    })
    const update = collapseWhitespace(`UPDATE ${tableName}
        SET ${updates.join(', ')}
        WHERE ${whereTests.join(' AND ')}
        `)
    const insert = collapseWhitespace(`INSERT INTO ${tableName}
        (${whereTests.concat(updates).join(', ').replace(/=\$\d+/g, '')})
        VALUES (${whereTests.concat(updates).map((_, i) => '$' + (i + 1)).join(', ')})
        `)
    return { update, insert, params }
}

const collapseWhitespace = (str) =>
    str.replace(/\n */g, ' ').replace(/\s+$/, '')
