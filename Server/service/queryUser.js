
function getUserQuery(){
    const query = `SELECT * FROM customers`
    return query
}

function setUserQuery(keys){
    const query = `SELECT model,womenImage,girlsImage,color,season FROM models NATURAL JOIN colors NATURAL JOIN seasons WHERE model = ?`
    return query
}

function getPasswordQuery(){
    const query = `SELECT * FROM passwords WHERE username = ? and password = ?`
    return query
}

function setPasswordQuery(keys){
    const query = `INSERT INTO passwords (${keys.map(key => key)}) VALUES (${keys.map(() => `?`)})`
    return query
}

export {
    getUserQuery, setUserQuery, getPasswordQuery, setPasswordQuery
}