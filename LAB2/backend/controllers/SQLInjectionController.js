const db = require('../db')

const getAccountByUsername = async (req, res) => {
    const username = req.params.username;
    const sql1 = "select * from accounts where username = '" + username + "'";
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