const db = require('../db')

const getCompetitions = async (req, res) => {
    const sql = 'select * from competition';
    try {
        const data = await db.query(sql, []);
        //res.status(200).json(data.rows);
    } catch (err) {
        console.log(err);
        throw err
    }
    res.status(200).json([]);
}

const getCompetitionById = async (req, res) => {
    const id = req.params.id;
    const name = req.params.name
    const sql1 = `select * from competition where id = ${id}`;
    const sql2 = "select * from game where competition = '" + name + "'";;
    const data = {};
    try {
        const comp = await db.query(sql1, []);
        const games = await db.query(sql2, []);
        data.competition = comp.rows[0];
        data.games = games.rows;
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        throw err
    }
}

const addCompetition = async (req, res) => {
    const name = req.body.name;
    const vrsta = req.body.vrsta;
    const rounds = req.body.tournament.rounds;
    const win = req.body.win;
    const lose = req.body.lose;
    const draw = req.body.draw;
    const createCompetition = "insert into competition (name, vrsta, win, lose, draw) values ('" + name + "', '" + vrsta + "', '" + win + "', '" + lose + "', '" + draw + "')";
    try {
        await db.query(createCompetition, []);
        
        rounds.forEach((k, i) => {
            const round = i + 1;
            k.forEach(async (p) => {
                const player1 = p.player1.name;
                const player2 = p.player2.name;
                const createGame = "insert into game (round, player1, player2, competition) values ('" + round + "', '" + player1 + "', '" + player2 + "', '" + name + "')";
                await db.query(createGame, []);
            });
        });
    } catch (err) {
        console.log(err);
        throw err
    }
    res.sendStatus(200);
}

const updateGame = async (req, res) => {
    const game = req.body;
    const id = game.id;
    const result = game.result;
    
    const updateGame = "update game set result = '" + result + "' where id = '" + id + "'";
    try {
        await db.query(updateGame, []);
    } catch (err) {
        console.log(err);
        throw err
    }
    res.sendStatus(200);
}

const deleteCompetition = async (req, res) => {
    const id = req.params.id;
    const name = req.params.name
    const sql1 = `delete from competition where id = ${id}`;
    const sql2 = "delete from game where competition = '" + name + "'";
    try {
        await db.query(sql1, []);
        await db.query(sql2, []);
    } catch (err) {
        console.log(err);
        throw err
    }
    res.sendStatus(200);
}

module.exports = {
    getCompetitions,
    getCompetitionById,
    addCompetition,
    deleteCompetition,
    updateGame
}