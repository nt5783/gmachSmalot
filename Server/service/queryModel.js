
function getModelQuery(queryparams) {
    const fields = Object.keys(queryparams).filter(param => {
        return param == 'color' || param == 'season';
    });
    let conditions = ""
    fields.forEach(field => conditions += "AND " + field + " = '" + queryparams[field] + "'")
    const query = `SELECT * FROM models WHERE isInUse = 1 ${fields.length > 0 ? conditions : ""} 
    ${queryparams._sort ? "ORDER BY " + queryparams._sort : ""} 
    ${queryparams._limit ? "LIMIT " + queryparams._limit : ""}`
    console.log(query)
    return query
}

function getModelByIdQuery() {
    //להציג לכולם את אלו שלא פעילים?
    const query = `SELECT * FROM models WHERE model = ?`;
    return query
}

function addModelQuery() {
    //להוסיף את הפרמטר המועבר לפונקציה אם משתמשים בו
    // const query = `INSERT INTO models (model, ${keys.map(key => key)}) VALUES (null ,? ,? ,? )`;
    const query = `INSERT INTO models VALUES (? ,? ,? ,? ,? ,null)`;
    return query
}

function deleteModelQuery() {
    const query = `UPDATE models SET isInUse = 0 WHERE model = ?`;
    return query
}

function updateModelQuery(keys) {
    const query = `UPDATE models SET ${keys.map(key => key + "= ?")} WHERE model = ?`;
    return query
}

export {
    getModelQuery, getModelByIdQuery, addModelQuery, deleteModelQuery, updateModelQuery
}