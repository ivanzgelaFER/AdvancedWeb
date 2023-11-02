var express = require('express');
var router = express.Router();
const controller = require('../controllers/BrokenAuthController');

router.post('/', controller.authenticate);

module.exports = router;