
function getGownsQuery(queryparams) {
    let firstPartOfQuery = 'SELECT gownId,model,amount,size,length FROM gowns NATURAL JOIN sizes NATURAL JOIN lengths '
    if (queryparams.hasOwnProperty('date')) {
        const date = new Date(queryparams.date)
        const firstDate = new Date(date);
        firstDate.setDate(date.getDate() - 2);
        const secondDate = new Date(date);
        secondDate.setDate(date.getDate() + 2);
        const formatDate = (date) => {
            return date.toISOString().slice(0, 10);
        }

        firstPartOfQuery = `select gownId, model, size, length, amount, X.amount - QuantityOccupied as available
        from lengths NATURAL JOIN sizes NATURAL JOIN gowns g1 NATURAL LEFT OUTER JOIN
        (select *,COUNT(*) as QuantityOccupied
        from gowns g NATURAL JOIN orders o
        where eventDate BETWEEN '${formatDate(firstDate)}' AND '${formatDate(secondDate)}'
        group by gownId) X`
    }
    const fields = Object.keys(queryparams).filter(param => {
        return param == 'model' || param == 'size' || param == 'length' || param == 'amount';
    });
    let conditions = "WHERE "
    fields.forEach(field => conditions += field + " = '" + queryparams[field] + "' AND ")
    //query = `SELECT * FROM gowns ${fields.length > 0 ? conditions.substring(0, conditions.length - 5) : ""} 
    const query = `${firstPartOfQuery} ${fields.length > 0 ? conditions.substring(0, conditions.length - 5) : ""} 
    ${queryparams._sort ? "ORDER BY " + queryparams._sort : ""} 
    ${queryparams._limit ? "LIMIT " + queryparams._limit : ""};`
    console.log(query)
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