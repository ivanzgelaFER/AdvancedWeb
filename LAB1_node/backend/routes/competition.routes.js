var express = require('express');
var router = express.Router();
const controller = require('../controllers/competitionController')

router.get('/all', controller.getCompetitions);
router.get('/:id', controller.getCompetitionById);
router.post('/add', controller.addCompetition);
router.delete('/:id', controller.deleteCompetition);

module.exports = router;