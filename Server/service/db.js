import mysql from 'mysql2/promise';
import 'dotenv/config'


async function executeQuery(query, params) {
    let results;
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        // socketPath: process.env.DB_SOCKET,
        //  port: process.env.DB_PORT,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD
    });
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