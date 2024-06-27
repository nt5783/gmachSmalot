
function getSeasonsQuery(queryparams) {
    const fields = Object.keys(queryparams).filter(param => {
        return param == 'season'
    });
    let conditions = "WHERE "
    fields.forEach(field => conditions += field + " = '" + queryparams[field] + "' AND ")
    const query = `SELECT * FROM seasons ${fields.length > 0 ? conditions.substring(0, conditions.length - 5) : ""} 
    ${queryparams._sort ? "ORDER BY " + queryparams._sort : ""} 
    ${queryparams._limit ? "LIMIT " + queryparams._limit : ""};`
    console.log(query)
    return query
}

function getSeasonByIdQuery() {
    // const query = `SELECT * FROM seasons WHERE id = ?`;
    const query = `SELECT * FROM seasons WHERE seasonId = ?`;
    return query
}

function addSeasonQuery() {
    const query = `INSERT INTO seasons VALUES (null ,?)`;
    return query
}

function deleteSeasonQuery() {
    const query = `DELETE FROM seasons WHERE seasonId = ?`;
    return query
}

function updateSeasonQuery(keys) {
    const query = `UPDATE seasons SET ${keys.map(key => key + "= ?")} WHERE seasonId = ?`;
    return query
}

export {
    getSeasonsQuery, getSeasonByIdQuery, addSeasonQuery, deleteSeasonQuery, updateSeasonQuery
}




// function getSeasonQuery(queryparams) {
//     const fields = Object.keys(queryparams).filter(param => {
//         return param == 'id' || param == 'title' || param == 'userId' || param == 'completed';
//     });
//     let conditions = "WHERE "
//     fields.forEach(field => conditions += field + " = '" + queryparams[field] + "' AND ")
//     const query = `SELECT * FROM Seasons ${fields.length > 0 ? conditions.substring(0, conditions.length - 5) : ""} 
//     ${queryparams._sort ? "ORDER BY " + queryparams._sort : ""} 
//     ${queryparams._limit ? "LIMIT " + queryparams._limit : ""};`
//     console.log(query)
//     return query
// }

// function getSeasonByIdQuery() {
//     const query = `SELECT * FROM Seasons WHERE id = ?`;
//     return query
// }

// function addSeasonQuery(keys) {
//     const query = `INSERT INTO Seasons (id, ${keys.map(key => key)}) VALUES (null ,? ,? ,? )`;
//     return query
// }

// function deleteSeasonQuery() {
//     const query = `DELETE FROM Seasons WHERE id = ?`;
//     return query
// }

// function updateSeasonQuery(keys) {
//     const query = `UPDATE Seasons SET ${keys.map(key => key + "= ?")} WHERE id = ?`;
//     return query
// }

// export {
//     getSeasonQuery, getSeasonByIdQuery, addSeasonQuery, deleteSeasonQuery, updateSeasonQuery
// }