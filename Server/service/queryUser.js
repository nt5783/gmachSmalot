
function getUserQuery(){
    const query = `SELECT username, fullName FROM customers WHERE username = ?`
    return query
}

function setUserQuery(keys){
    const query = `INSERT INTO customers (${keys.map(key => key)}) VALUES (${keys.map(() => `?`)})`
    return query
}

function getPasswordQuery(){
    const query = `SELECT * FROM passwords WHERE username = ? AND password = ?`
    return query
}

function setPasswordQuery(){
    // const query = `INSERT INTO passwords (${keys.map(key => key)}) VALUES (${keys.map(() => `?`)})`
    const query = `INSERT INTO passwords VALUES (?,?)`
    return query
}

export {
    getUserQuery, setUserQuery, getPasswordQuery, setPasswordQuery
}