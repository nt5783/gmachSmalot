
function getPropertiesQuery(queryparams, propertyName) {
    const fields = Object.keys(queryparams).filter(param => {
        return param == propertyName
    });
    let conditions = "WHERE "
    fields.forEach(field => conditions += field + " = '" + queryparams[field] + "' AND ")
    const query = `SELECT * FROM ${propertyName}s ${fields.length > 0 ? conditions.substring(0, conditions.length - 5) : ""} 
    ${queryparams._sort ? "ORDER BY " + queryparams._sort : ""} 
    ${queryparams._limit ? "LIMIT " + queryparams._limit : ""};`
    console.log(query)
    return query
}

function getPropertyByIdQuery(propertyName) {
    const query = `SELECT * FROM ${propertyName}s ${propertyName}Id = ?`;
    console.log(query)
    return query
}

function addPropertyQuery(propertyName) {
    const query = `INSERT INTO ${propertyName}s VALUES (null ,?)`;
    console.log(query)
    return query
}

export {
    getPropertiesQuery, getPropertyByIdQuery, addPropertyQuery
}