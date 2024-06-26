
function getColorsQuery(queryparams) {
    const fields = Object.keys(queryparams).filter(param => {
        return param == 'color'
    });
    let conditions = "WHERE "
    fields.forEach(field => conditions += field + " = '" + queryparams[field] + "' AND ")
    const query = `SELECT * FROM colors ${fields.length > 0 ? conditions.substring(0, conditions.length - 5) : ""} 
    ${queryparams._sort ? "ORDER BY " + queryparams._sort : ""} 
    ${queryparams._limit ? "LIMIT " + queryparams._limit : ""};`
    console.log(query)
    return query
}

function getColorByIdQuery() {
    // const query = `SELECT * FROM colors WHERE id = ?`;
    const query = `SELECT colorId,model,amount,size,length FROM colors NATURAL JOIN sizes NATURAL JOIN lengths WHERE colorId = ?`;
    return query
}

function addColorQuery() {
    const query = `INSERT INTO colors VALUES (null ,?)`;
    return query
}

function deleteColorQuery() {
    const query = `DELETE FROM colors WHERE colorId = ?`;
    return query
}

function updateColorQuery(keys) {
    const query = `UPDATE colors SET ${keys.map(key => key + "= ?")} WHERE colorId = ?`;
    return query
}

export {
    getColorsQuery, getColorByIdQuery, addColorQuery, deleteColorQuery, updateColorQuery
}




// function getColorQuery(queryparams) {
//     const fields = Object.keys(queryparams).filter(param => {
//         return param == 'id' || param == 'title' || param == 'userId' || param == 'completed';
//     });
//     let conditions = "WHERE "
//     fields.forEach(field => conditions += field + " = '" + queryparams[field] + "' AND ")
//     const query = `SELECT * FROM colors ${fields.length > 0 ? conditions.substring(0, conditions.length - 5) : ""} 
//     ${queryparams._sort ? "ORDER BY " + queryparams._sort : ""} 
//     ${queryparams._limit ? "LIMIT " + queryparams._limit : ""};`
//     console.log(query)
//     return query
// }

// function getColorByIdQuery() {
//     const query = `SELECT * FROM colors WHERE id = ?`;
//     return query
// }

// function addColorQuery(keys) {
//     const query = `INSERT INTO colors (id, ${keys.map(key => key)}) VALUES (null ,? ,? ,? )`;
//     return query
// }

// function deleteColorQuery() {
//     const query = `DELETE FROM colors WHERE id = ?`;
//     return query
// }

// function updateColorQuery(keys) {
//     const query = `UPDATE colors SET ${keys.map(key => key + "= ?")} WHERE id = ?`;
//     return query
// }

// export {
//     getColorQuery, getColorByIdQuery, addColorQuery, deleteColorQuery, updateColorQuery
// }