
function getModelQuery(queryparams) {
    console.log(queryparams)
    let query;
    if (queryparams.hasOwnProperty('date')) {
        console.log(queryparams.date)
        const date = new Date(queryparams.date)
        const firstDate = new Date(date);
        firstDate.setDate(date.getDate() - 2);

        const secondDate = new Date(date);
        secondDate.setDate(date.getDate() + 2);

        const formatDate = (date) => {
            return date.toISOString().slice(0, 10);
        }

        query = `select distinct model,color,season,womenImage,girlsImage
        from gowns NATURAL JOIN models NATURAL JOIN colors NATURAL JOIN seasons
        where isInUse=1 and gownId not in (select OG.gownId
        from(
        select *,COUNT(*) as QuantityOccupied
        from gowns g NATURAL JOIN orders o
        where eventDate BETWEEN '${formatDate(firstDate)}' AND '${formatDate(secondDate)}'
        group by gownId) OG
        where QuantityOccupied=OG.amount);`
        // query = `select distinct model from gowns where gownId not in (select OG.gownId from( select *,COUNT(*) as QuantityOccupied from gowns g NATURAL JOIN orders o where eventDate='${queryparams.date}' group by gownId) OG where QuantityOccupied=OG.amount);`
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