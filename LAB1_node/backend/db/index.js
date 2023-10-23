const {Pool} = require('pg');
var dotenv = require('dotenv');
dotenv.config()

const pool = new Pool({
    //onnectionString: "postgres://ivan:tYuaocd9TrE8K4M02FxXCkNkzF5ZVMSV@dpg-ckqn2aprfc9c739sft4g-a/web2_lab1_2gge",
    //connectionString: "mysql://ujbtz42hnjir26oo:vAZXe6OGNwhW2MQcUe6h@blamxtxdr4jbeelputqc-mysql.services.clever-cloud.com:3306/blamxtxdr4jbeelputqc"
    connectionString: "postgres://default:c2hpi4tbUwIT@ep-withered-math-75496893.eu-central-1.postgres.vercel-storage.com:5432/verceldb"
    
    //user: process.env.DB_USER,
    //host: process.env.DB_HOST,
    //database: process.env.DB_DATABASE,
    //password: process.env.DB_PASS,
    //port:  process.env.DB_PORT,
    ,
    ssl: true  //za produkciju ovo moras izmijeniti, treb ti https umjesto http na kojoj je sad
});

const sql_create_competition = `CREATE TABLE categories (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text,
    vrsta text,
    win int, 
    lose int, 
    draw int
)`;

const sql_create_game = `CREATE TABLE categories (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    round int,
    player1 text,
    player2 text, 
    competition text, 
    result int
)`;


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