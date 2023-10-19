var express = require('express');
var router = express.Router();
const controller = require('../controllers/competitionController')

router.get('/all', controller.getCompetitions);
router.get('/:id', controller.getCompetitionById);
router.post('/add', controller.addCompetition);

module.exports = router;