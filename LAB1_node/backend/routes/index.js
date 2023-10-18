var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    
    res.json({isAuthenticated: req.oidc.isAuthenticated(), 
              user: req.oidc.user ?? {},
              title: "Ivan Zgela Auth demo project"
    });
    
    //res.render("index", {title: "Ivan Zgela Auth demo project", isAuthenticated: req.oidc.isAuthenticated()});
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