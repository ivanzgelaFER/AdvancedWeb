var express = require('express');
var router = express.Router();
const controller = require('../controllers/competitionController')

router.get('/all', controller.getCompetitions);
router.get('/:id/:name', controller.getCompetitionById);
router.post('/add', controller.addCompetition);
router.post('/game', controller.updateGame);
router.delete('/:id/:name', controller.deleteCompetition);

module.exports = router;