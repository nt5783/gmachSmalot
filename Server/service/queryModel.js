
function getModelQuery(queryparams) {
    console.log(queryparams)
    let query;
    if (queryparams.hasOwnProperty('date')) {
        console.log(queryparams.date)
        const date = new Date(queryparams.date)
        const firstDate = new Date(date);
        const secondDate = new Date(date);
        // firstDate.setDate(date.getDate() - 2);  
        // secondDate.setDate(date.getDate() + 2);
        const addBusinessDays = (date, days) => {
            for (let i = 0; i < days; i++) {
                date.setDate(date.getDate() + 1);
                // Skip Fridays (day 5) and Saturdays (day 6)
                if (date.getDay() === 5) {
                    date.setDate(date.getDate() + 2); // Skip to Monday
                } else if (date.getDay() === 6) {
                    date.setDate(date.getDate() + 1); // Skip to Sunday
                }
            }
        };
        addBusinessDays(firstDate, -2);
        addBusinessDays(secondDate, 2);
        const formatDate = (date) => {
            return date.toISOString().slice(0, 10);
        };

        query = `select distinct model,color,season,image
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
        query = `SELECT model,image,color,season FROM models NATURAL JOIN colors NATURAL JOIN seasons WHERE isInUse = 1 ${fields.length > 0 ? conditions : ""} 
    ${queryparams._sort ? "ORDER BY " + queryparams._sort : ""} 
    ${queryparams._limit ? "LIMIT " + queryparams._limit : ""}`
    }
    console.log(query)
    return query
}

function getModelByIdQuery() {
    //להציג לכולם את אלו שלא פעילים?
    // const query = `SELECT * FROM models WHERE model = ?`;
    const query = `SELECT model,image,color,season FROM models NATURAL JOIN colors NATURAL JOIN seasons WHERE model = ?`
    return query
}

function addModelQuery() {
    // const query = `INSERT INTO models (${keys.map(key => key)}) VALUES (${values.map(value => `'${value}'`)})`;
    const query = `INSERT INTO models (model,colorId,seasonId,image) VALUES (?,?,?,?)`;
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

function getColorIdQuery() {
    const query = `SELECT colorId FROM colors WHERE color = ?`
    return query
}

function getSeasonIdQuery() {
    const query = `SELECT seasonId FROM seasons WHERE season = ?`
    return query
}

export {
    getModelQuery, getModelByIdQuery, addModelQuery, deleteModelQuery, updateModelQuery, getColorIdQuery, getSeasonIdQuery
}