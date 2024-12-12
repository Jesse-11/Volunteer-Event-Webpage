const mysql = require('mysql2');
const util = require('util');

// Database configuration
const pool = mysql.createPool({
    connectionLimit: 10,  // the number of connections Node.js will maintain in the pool
    host: 'localhost',    // database host
    user: 'root', // our database username
    password : 'password',
    database: 'WDC_db' // our database name
});

// Ping database to check for common exception errors.
pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.');
        }
    }


    if (connection) connection.release();
    return;
});

// test script begins :

function checkDatabaseContents(table) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.error('Error getting connection:', err);
                return reject(err);
            }

            const sql = `SELECT * FROM ??`;
            connection.query(sql, [table], (error, results) => {
                if (connection) connection.release(); // Release the connection

                if (error) {
                    console.error('Error executing query:', error);
                    return reject(error);
                }

                console.log('Database Contents:', results);
                resolve(results);
            });
        });
    });
}

checkDatabaseContents('Users')
    .then(contents => console.log('Query successful:', contents))
    .catch(error => console.error('Query failed:', error));

//test script ends

// Promisify for Node.js async/await.
pool.query = util.promisify(pool.query);

module.exports = pool;