
function getUserQuery(){
    const query = `SELECT * FROM customers`
    return query
}

function setUserQuery(keys){
    const query = `INSERT INTO customers (${keys.map(key => key)}) VALUES (${keys.map(() => `?`)})`
    return query
}

function getPasswordQuery(){
    const query = `SELECT * FROM passwords WHERE username = ?`
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