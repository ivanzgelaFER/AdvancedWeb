const db = require('../db')

const getAccountById = async (req, res) => {
    const id = req.params.id;
    const sql1 = `select * from accounts where id = ${id}`;
    try {
        const account = await db.query(sql1, []);
        data.accounts = comp.rows;
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        throw err
    }
}
 

module.exports = {
    getAccountById,
}