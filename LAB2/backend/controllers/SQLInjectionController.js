const db = require('../db')

const getAccountByUsername = async (req, res) => {
    const query = req.params.username;
    const attack = req.params.attack;
    let sql1;
    if(attack == "tautology") {
        sql1 = "select * from accounts where username = '" + query + "'";
    } else if(attack == "union") {
        sql1 = "select * from accounts " + query + "";
    }
    const data = {};
    try {
        const account = await db.query(sql1, []);
        data.accounts = account.rows;
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        throw err
    }
}
 

module.exports = {
    getAccountByUsername,
}