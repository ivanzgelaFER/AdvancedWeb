var express = require('express');
var router = express.Router();

router.get('/all', async function(req, res) {
    res.json({comp: "Natjecanje1"})
});

module.exports = router;