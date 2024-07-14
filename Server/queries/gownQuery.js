
function getGownsQuery(queryparams) {
    let firstPartOfQuery = 'SELECT gownId,model,amount,size,sizeId FROM gowns NATURAL JOIN sizes '
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

        const formattedFirstDate = formatDate(firstDate);
        const formattedSecondDate = formatDate(secondDate);

        console.log(formattedFirstDate, formattedSecondDate);

        firstPartOfQuery = `select gownId, model, size, sizeId, amount, X.amount - QuantityOccupied as available
        from sizes NATURAL JOIN gowns g1 NATURAL LEFT OUTER JOIN
        (select *,COUNT(*) as QuantityOccupied
        from gowns g NATURAL JOIN orders o
        where eventDate BETWEEN '${formatDate(firstDate)}' AND '${formatDate(secondDate)}'
        group by gownId) X`
    }
    const fields = Object.keys(queryparams).filter(param => {
        return param == 'model' || param == 'sizeId' || param == 'amount';
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
    const query = `SELECT gownId,model,amount,size FROM gowns NATURAL JOIN sizes WHERE gownId = ?`;
    return query
}

function addGownQuery(keys) {
    const query = `INSERT INTO gowns (${keys.map(key => key)}) VALUES (${keys.map(() => '?')})`;
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