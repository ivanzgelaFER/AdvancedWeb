var express = require('express');
var router = express.Router();
const controller = require('../controllers/SQLInjectionController');

router.get('/:username/:attack', controller.getAccountByUsername);

module.exports = router;