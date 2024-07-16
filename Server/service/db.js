import mysql from 'mysql2/promise';
import 'dotenv/config'

async function executeQuery(query, params) {
    let results;
    const connection = process.env.DB_TYPE == "mariadb" ? await mysql.createConnection({
        user: process.env.DB_USER,
        socketPath: process.env.DB_SOCKET,
        database: process.env.DB_NAME,
    }) : await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD
    })
    try {
        [results] = await connection.execute(query, params);
    } catch (err) {
        console.log(err);
        throw err;
    }
    finally {
        connection.end();
    }
    return results;
}

export {
    executeQuery
}