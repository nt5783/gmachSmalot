
function getModelsQuery(queryparams) {
    let query;
    if (queryparams.hasOwnProperty('date')) {
        const date = new Date(queryparams.date)
        const firstDate = new Date(date);
        const secondDate = new Date(date);

        const addBusinessDays = (date, days) => {
            const isNegative = days < 0;
            days = Math.abs(days);

            for (let i = 0; i < days; i++) {
                if (isNegative) {
                    date.setDate(date.getDate() - 1);
                    if (date.getDay() === 5) {
                        date.setDate(date.getDate() - 1);
                    } else if (date.getDay() === 6) {
                        date.setDate(date.getDate() - 2);
                    }
                } else {
                    date.setDate(date.getDate() + 1);
                    if (date.getDay() === 5) {
                        date.setDate(date.getDate() + 2);
                    } else if (date.getDay() === 6) {
                        date.setDate(date.getDate() + 1);
                    }
                }
            }
        };


        addBusinessDays(firstDate, -2);
        addBusinessDays(secondDate, 2);
        const formatDate = (date) => {
            return date.toISOString().slice(0, 10);
        };

        query = `select distinct model,color,season,length,image
                from gowns NATURAL JOIN models NATURAL JOIN colors NATURAL JOIN seasons NATURAL JOIN lengths
                where isInUse=1 and gownId not in (select OG.gownId
                from(
                select *,COUNT(*) as QuantityOccupied
                from gowns g NATURAL JOIN orders o
                where eventDate BETWEEN '${formatDate(firstDate)}' AND '${formatDate(secondDate)}'
                group by gownId) OG
                where QuantityOccupied=OG.amount);`
    }
    else {
        const fields = Object.keys(queryparams).filter(param => {
            return param == 'color' || param == 'season' || param == 'length';
        });
        let conditions = ""
        fields.forEach(field => conditions += "AND " + field + " = '" + queryparams[field] + "'")
        query = `SELECT model,image,color,season,length FROM models NATURAL JOIN colors NATURAL JOIN seasons NATURAL JOIN lengths WHERE isInUse = 1 ${fields.length > 0 ? conditions : ""} 
    ${queryparams._sort ? "ORDER BY " + queryparams._sort : ""} 
    ${queryparams._limit ? "LIMIT " + queryparams._limit : ""}`
    }
    console.log(query)
    return query
}

function getModelByIdQuery() {
    const query = `SELECT model,image,color,season,length FROM models NATURAL JOIN colors NATURAL JOIN seasons NATURAL JOIN lengths WHERE model = ?`
    return query
}

function addModelQuery(keys) {
    const query = `INSERT INTO models (${keys.map(key => key)}) VALUES (${keys.map(() => '?')})`;
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
    getModelsQuery, getModelByIdQuery, addModelQuery, deleteModelQuery, updateModelQuery
}