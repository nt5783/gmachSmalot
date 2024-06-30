
function getLengthsQuery(queryparams) {
    const fields = Object.keys(queryparams).filter(param => {
        return param == 'length'
    });
    let conditions = "WHERE "
    fields.forEach(field => conditions += field + " = '" + queryparams[field] + "' AND ")
    const query = `SELECT * FROM lengths ${fields.length > 0 ? conditions.substring(0, conditions.length - 5) : ""} 
    ${queryparams._sort ? "ORDER BY " + queryparams._sort : ""} 
    ${queryparams._limit ? "LIMIT " + queryparams._limit : ""};`
    console.log(query)
    return query
}

function getLengthByIdQuery() {
    // const query = `SELECT * FROM lengths WHERE id = ?`;
    const query = `SELECT * FROM lengths WHERE lengthId = ?`;
    return query
}

function addLengthQuery() {
    const query = `INSERT INTO lengths VALUES (null ,?)`;
    return query
}

function deleteLengthQuery() {
    const query = `DELETE FROM lengths WHERE lengthId = ?`;
    return query
}

function updateLengthQuery(keys) {
    const query = `UPDATE lengths SET ${keys.map(key => key + "= ?")} WHERE lengthId = ?`;
    return query
}

export {
    getLengthsQuery, getLengthByIdQuery, addLengthQuery, deleteLengthQuery, updateLengthQuery
}




// function getLengthQuery(queryparams) {
//     const fields = Object.keys(queryparams).filter(param => {
//         return param == 'id' || param == 'title' || param == 'userId' || param == 'completed';
//     });
//     let conditions = "WHERE "
//     fields.forEach(field => conditions += field + " = '" + queryparams[field] + "' AND ")
//     const query = `SELECT * FROM Lengths ${fields.length > 0 ? conditions.substring(0, conditions.length - 5) : ""} 
//     ${queryparams._sort ? "ORDER BY " + queryparams._sort : ""} 
//     ${queryparams._limit ? "LIMIT " + queryparams._limit : ""};`
//     console.log(query)
//     return query
// }

// function getLengthByIdQuery() {
//     const query = `SELECT * FROM Lengths WHERE id = ?`;
//     return query
// }

// function addLengthQuery(keys) {
//     const query = `INSERT INTO Lengths (id, ${keys.map(key => key)}) VALUES (null ,? ,? ,? )`;
//     return query
// }

// function deleteLengthQuery() {
//     const query = `DELETE FROM Lengths WHERE id = ?`;
//     return query
// }

// function updateLengthQuery(keys) {
//     const query = `UPDATE Lengths SET ${keys.map(key => key + "= ?")} WHERE id = ?`;
//     return query
// }

// export {
//     getLengthQuery, getLengthByIdQuery, addLengthQuery, deleteLengthQuery, updateLengthQuery
// }