
function getGownsQuery(queryparams) {
    const fields = Object.keys(queryparams).filter(param => {
        return param == 'color' || param == 'size' || param == 'length' || param == 'season';
    });
    let conditions = "WHERE "
    fields.forEach(field => conditions += field + " = '" + queryparams[field] + "' AND ")
    const query = `SELECT * FROM gowns ${fields.length > 0 ? conditions.substring(0, conditions.length - 5) : ""} 
    ${queryparams._sort ? "ORDER BY " + queryparams._sort : ""} 
    ${queryparams._limit ? "LIMIT " + queryparams._limit : ""};`
    console.log(query)
    return query
}

function getGownByIdQuery() {
    const query = `SELECT * FROM gowns WHERE id = ?`;
    return query
}

function addGownQuery(keys) {
    const query = `INSERT INTO gowns (id, ${keys.map(key => key)}) VALUES (null ,? ,? ,? ,? ,? ,? )`;
    return query
}

function deleteGownQuery() {
    const query = `DELETE FROM gowns WHERE id = ?`;
    return query
}

function updateGownQuery(keys) {
    const query = `UPDATE gowns SET ${keys.map(key => key + "= ?")} WHERE id = ?`;
    return query
}

export {
    getGownsQuery, getGownByIdQuery, addGownQuery, deleteGownQuery, updateGownQuery
}