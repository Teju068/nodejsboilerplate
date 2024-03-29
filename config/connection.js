const util    = require('util');
const mysql   = require('mysql');
const config  = require('./config'); 

const pool = mysql.createPool({
      connectionLimit: 100,
      host: config.db_host,
      user: config.db_user,
      password: config.db_password,
      database: config.db_name
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
        console.log(err);
    }

    if (connection) connection.release();
    return;
});
// Promisify for Node.js async/await.
pool.query = util.promisify(pool.query);

module.exports = pool;