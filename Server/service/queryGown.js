
function getGownsQuery(queryparams) {
    let query;
    if (queryparams.hasOwnProperty('date')) {
        //אולי צריך להיות המודלים?
        //התאריכים צריכים להיות גם מלפני ואחרי
        console.log(queryparams.date)
        query = `select distinct model from gowns where gownId not in (select OG.gownId from( select *,COUNT(*) as QuantityOccupied from gowns g NATURAL JOIN orders o where eventDate='${queryparams.date}' group by gownId) OG where QuantityOccupied=OG.amount);`
        console.log(query)
    }
    else {
        const fields = Object.keys(queryparams).filter(param => {
            return param == 'model' || param == 'size' || param == 'length' || param == 'amount';
        });
        let conditions = "WHERE "
        fields.forEach(field => conditions += field + " = '" + queryparams[field] + "' AND ")
        //query = `SELECT * FROM gowns ${fields.length > 0 ? conditions.substring(0, conditions.length - 5) : ""} 
        query = `SELECT gownId,model,amount,size,length FROM gowns NATURAL JOIN sizes NATURAL JOIN lengths ${fields.length > 0 ? conditions.substring(0, conditions.length - 5) : ""} 
    ${queryparams._sort ? "ORDER BY " + queryparams._sort : ""} 
    ${queryparams._limit ? "LIMIT " + queryparams._limit : ""};`
        console.log(query)
    }
    return query
}

function getGownByIdQuery() {
    // const query = `SELECT * FROM gowns WHERE id = ?`;
    const query = `SELECT gownId,model,amount,size,length FROM gowns NATURAL JOIN sizes NATURAL JOIN lengths WHERE gownId = ?`;
    return query
}

function addGownQuery(keys) {
    const query = `INSERT INTO gowns (gownId, ${keys.map(key => key)}) VALUES (null ,? ,? ,? ,?)`;
    return query
}

function deleteGownQuery() {
    const query = `DELETE FROM gowns WHERE gownId = ?`;
    return query
}

function updateGownQuery(keys) {
    const query = `UPDATE gowns SET ${keys.map(key => key + "= ?")} WHERE gownId = ?`;
    return query
}

export {
    getGownsQuery, getGownByIdQuery, addGownQuery, deleteGownQuery, updateGownQuery
}