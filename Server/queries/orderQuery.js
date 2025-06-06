function getOrdersQuery(queryparams) {
    const range = Object.keys(queryparams).filter(param => {
        return param == 'future' || param == 'past' || param == 'today';
    });
    let operator='';
    switch (range[0]) {
        case 'future':
            operator = '>='
            break;
        case 'past':
            operator = '<='
            break;
        case 'today':
            operator = '='
            break;
        default:
            break;
    }
    let today = new Date().toISOString().slice(0, 10);
    const fields = Object.keys(queryparams).filter(param => {
        return param == 'eventDate' || param == 'gownId' || param == 'userId';
    });
    let conditions = "WHERE "
    fields.forEach(field => conditions += field + " = '" + queryparams[field] + "' AND ")
    const query = `SELECT eventDate, model, size, fullName, phone, phone2, city, email from orders NATURAL JOIN users NATURAL JOIN gowns NATURAL JOIN sizes
    ${fields.length > 0 ? conditions.substring(0, conditions.length - 5) : ""}
    ${operator ?((fields.length>0?' AND ':'WHERE ')+ `eventDate ${operator} '${today}'`) : ''}
    ${queryparams._sort ? "ORDER BY " + queryparams._sort : ""} 
    ${queryparams._limit ? "LIMIT " + queryparams._limit : ""};`
    console.log(query)
    return query
}

function getOrderByIdQuery() {
    const query = `SELECT * FROM orders WHERE orderId = ?`;
    return query
}

function addOrderQuery(itemsNum) {
    let query = `INSERT INTO orders VALUES (null ,? ,? ,?) `;
    for (let i = 0; i < itemsNum - 1; i++) {
        query = query += ',(null ,? ,? ,?)'
    }
    return query
}

function deleteOrderQuery() {
    const query = `DELETE FROM orders WHERE orderId = ?`;
    return query
}

function updateOrderQuery(keys) {
    const query = `UPDATE orders SET ${keys.map(key => key + "= ?")} WHERE orderId = ?`;
    return query
}

export {
    getOrdersQuery, getOrderByIdQuery, addOrderQuery, deleteOrderQuery, updateOrderQuery
}