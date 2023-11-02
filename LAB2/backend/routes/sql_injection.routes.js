var express = require('express');
var router = express.Router();
const controller = require('../controllers/SQLInjectionController');

router.get('/:id', controller.getAccountById);

module.exports = router;