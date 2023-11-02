const {Pool} = require('pg');
var dotenv = require('dotenv');
dotenv.config()

const pool = new Pool({
    connectionString: process.env.DB_CONNECTIONSTRING
    //user: process.env.DB_USER,
    //host: process.env.DB_HOST,
    //database: process.env.DB_DATABASE,
    //password: process.env.DB_PASS,
    //port:  process.env.DB_PORT,
    ,
    ssl: true
});

const sql_create_accounts = `CREATE TABLE accounts (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    firstname text,
    lastname text,
    gmail text,
    password text
)`;
/*
const sql_create_game = `CREATE TABLE game (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    round int,
    player1 text,
    player2 text, 
    competition text, 
    result int
)`;
*/ 

let table_names = [
    "accounts"
]

let tables = [
    sql_create_accounts,
];

(async () => {
    //console.log("Creating and populating tables");
    for (let i = 0; i < tables.length; i++) {
        //console.log("Creating table " + table_names[i] + ".");
        try {
            await pool.query(tables[i], [])
            //console.log("Table " + table_names[i] + " created.");
            if (table_data[i] !== undefined) {
                try {
                    await pool.query(table_data[i], [])
                    //console.log("Table " + table_names[i] + " populated with data.");
                } catch (err) {
                    //console.log("Error populating table " + table_names[i] + " with data.")
                    return console.log(err.message);
                }
            }
        } catch (err) {
            console.log("Error creating table " + table_names[i])
            return console.log(err.message);
        }
    }
    await pool.end();
})()

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