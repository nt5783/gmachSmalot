
function getUserQuery() {
    const query = `SELECT userId, username, fullName FROM users WHERE username = ?`
    return query
}

function setUserQuery(keys) {
    const query = `INSERT INTO users (${keys.map(key => key)}) VALUES (${keys.map(() => `?`)})`
    return query
}

function getPasswordQuery() {
    const query = `SELECT * FROM passwords WHERE username = ? AND password = ?`
    return query
}

function setPasswordQuery() {
    const query = `INSERT INTO passwords VALUES (?,?,?)`
    return query
}

export {
    getUserQuery, setUserQuery, getPasswordQuery, setPasswordQuery
}