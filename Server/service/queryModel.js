
function getModelQuery(queryparams) {
    let query;
    if (queryparams.hasOwnProperty('date')) {
        //אולי צריך להיות המודלים?
        //התאריכים צריכים להיות גם מלפני ואחרי
        console.log(queryparams.date)
        query = `select distinct model from gowns where gownId not in (select OG.gownId from( select *,COUNT(*) as QuantityOccupied from gowns g NATURAL JOIN orders o where eventDate='${queryparams.date}' group by gownId) OG where QuantityOccupied=OG.amount);`
        console.log(query)
    }
    else {
        //אם אני רוצה חורף וכל השנה?
        const fields = Object.keys(queryparams).filter(param => {
            return param == 'color' || param == 'season';
        });
        let conditions = ""
        fields.forEach(field => conditions += "AND " + field + " = '" + queryparams[field] + "'")
        // const query = `SELECT * FROM models WHERE isInUse = 1 ${fields.length > 0 ? conditions : ""} 
        query = `SELECT model,womenImage,girlsImage,color,season FROM models NATURAL JOIN colors NATURAL JOIN seasons WHERE isInUse = 1 ${fields.length > 0 ? conditions : ""} 
    ${queryparams._sort ? "ORDER BY " + queryparams._sort : ""} 
    ${queryparams._limit ? "LIMIT " + queryparams._limit : ""}`
    }
    console.log(query)
    return query
}

function getModelByIdQuery() {
    //להציג לכולם את אלו שלא פעילים?
    // const query = `SELECT * FROM models WHERE model = ?`;
    const query = `SELECT model,womenImage,girlsImage,color,season FROM models NATURAL JOIN colors NATURAL JOIN seasons WHERE model = ?`
    return query
}

function addModelQuery(keys) {
    // const query = `INSERT INTO models (${keys.map(key => key)}) VALUES (${values.map(value => `'${value}'`)})`;
    const query = `INSERT INTO models (${keys.map(key => key)}) VALUES (${keys.map(() => `?`)})`;
    // const query = `INSERT INTO models VALUES (? ,? ,? ,? ,? , ?)`;
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