const {Pool} = require('pg');
var dotenv = require('dotenv');
dotenv.config()

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASS,
    port:  process.env.DB_PORT,
    //ssl: true  //za produkciju ovo moras izmijeniti, treb ti https umjesto http na kojoj je sad
});

module.exports = {
    query: (text, params) => {
        const start = Date.now();
        return pool.query(text, params)
            .then(res => {
                const duration = Date.now() - start;
                //console.log('executed query', {text, params, duration, rows: res.rows});
                return res;
            });
    },
    pool: pool
}