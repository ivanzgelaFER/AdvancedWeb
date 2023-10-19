const db = require('../db')

const getCompetitions = async (req, res) => {
    const sql = 'select * from competition';
    try {
        const data = await db.query(sql, []);
        res.status(200).json(data.rows);
    } catch (err) {
        console.log(err);
        throw err
    }
}

const getCompetitionById = async (req, res) => {
    const id = req.params.id;
    const sql = `select * from competition where id = ${id}`;
    try {
        const data = await db.query(sql, []);
        res.status(200).json(data.rows);
    } catch (err) {
        console.log(err);
        throw err
    }
}

const addCompetition = async (req, res) => {
    const name = req.body.name;
    const sql = "insert into competition (name) values ('" + name + "')";
    try {
        await db.query(sql, []);
        res.status(200);
    } catch (err) {
        console.log(err);
        throw err
    }
    res.status(200);
}

module.exports = {
    getCompetitions,
    getCompetitionById,
    addCompetition
}