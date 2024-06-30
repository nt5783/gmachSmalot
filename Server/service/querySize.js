
function getSizesQuery(queryparams) {
    const fields = Object.keys(queryparams).filter(param => {
        return param == 'size'
    });
    let conditions = "WHERE "
    fields.forEach(field => conditions += field + " = '" + queryparams[field] + "' AND ")
    const query = `SELECT * FROM sizes ${fields.length > 0 ? conditions.substring(0, conditions.length - 5) : ""} 
    ${queryparams._sort ? "ORDER BY " + queryparams._sort : ""} 
    ${queryparams._limit ? "LIMIT " + queryparams._limit : ""};`
    console.log(query)
    return query
}

function getSizeByIdQuery() {
    // const query = `SELECT * FROM sizes WHERE id = ?`;
    const query = `SELECT * FROM sizes WHERE sizeId = ?`;
    return query
}

function addSizeQuery() {
    const query = `INSERT INTO sizes VALUES (null ,?)`;
    return query
}

function deleteSizeQuery() {
    const query = `DELETE FROM sizes WHERE sizeId = ?`;
    return query
}

function updateSizeQuery(keys) {
    const query = `UPDATE sizes SET ${keys.map(key => key + "= ?")} WHERE sizeId = ?`;
    return query
}

export {
    getSizesQuery, getSizeByIdQuery, addSizeQuery, deleteSizeQuery, updateSizeQuery
}




// function getSizeQuery(queryparams) {
//     const fields = Object.keys(queryparams).filter(param => {
//         return param == 'id' || param == 'title' || param == 'userId' || param == 'completed';
//     });
//     let conditions = "WHERE "
//     fields.forEach(field => conditions += field + " = '" + queryparams[field] + "' AND ")
//     const query = `SELECT * FROM Sizes ${fields.length > 0 ? conditions.substring(0, conditions.length - 5) : ""} 
//     ${queryparams._sort ? "ORDER BY " + queryparams._sort : ""} 
//     ${queryparams._limit ? "LIMIT " + queryparams._limit : ""};`
//     console.log(query)
//     return query
// }

// function getSizeByIdQuery() {
//     const query = `SELECT * FROM Sizes WHERE id = ?`;
//     return query
// }

// function addSizeQuery(keys) {
//     const query = `INSERT INTO Sizes (id, ${keys.map(key => key)}) VALUES (null ,? ,? ,? )`;
//     return query
// }

// function deleteSizeQuery() {
//     const query = `DELETE FROM Sizes WHERE id = ?`;
//     return query
// }

// function updateSizeQuery(keys) {
//     const query = `UPDATE Sizes SET ${keys.map(key => key + "= ?")} WHERE id = ?`;
//     return query
// }

// export {
//     getSizeQuery, getSizeByIdQuery, addSizeQuery, deleteSizeQuery, updateSizeQuery
// }