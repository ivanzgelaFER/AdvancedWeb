var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    console.log(req.oidc.isAuthenticated());
    res.render("index", {title: "Ivan"});
});

/*
app.get('/login', function(req, res) {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
  });
  
  
  app.get('/login', function(req, res) {
    
  });
  
  app.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
  });
*/
module.exports = router;