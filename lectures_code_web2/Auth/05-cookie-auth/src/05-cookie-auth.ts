import * as auth from './05-auth-middleware';
import express from 'express';
import path from 'path';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'pug');

auth.initCookieAuth(app, 'login');

app.get('/',  function (req, res) {
    res.render('index', {user : req.user});
});

app.get('/login', function (req, res) {
    res.render('login');
});

app.post('/login',  function (req, res) {        
    const username = req.body.username;    
	const password = req.body.password;        
    if (password !== 'some password') {
        res.render('login');
    }
    else {
        auth.signInUser(res, username);

        const returnUrl = req.query.returnUrl;
        if (typeof returnUrl === 'string') {
            res.redirect(returnUrl); //TO DO: (Security) Check if this is a local url
        }        
        else {
            res.redirect("/");
        }
    }
});

app.post('/logout',   function (req, res) {
    auth.signOutUser(res);
    res.redirect("/");
});

app.get('/private', auth.requiresAuthentication, function (req, res) {   
    const username = req.user!.username;     
    if (username.toLowerCase() === 'alice' || username.toLowerCase() === 'bob') {
            res.render('private', {user : req.user});
    }
    else {
        res.status(403);
        res.end('Forbidden for ' + username);
    }        
});

const hostname = '127.0.0.1';
const port = 4050;
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});