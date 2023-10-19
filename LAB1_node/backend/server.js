var express = require('express');
var cors = require('cors');
const { auth } = require('express-oauth2-jwt-bearer');
//const pg = require('pg');
//const db = require('./db');
const session = require('express-session');
//const pgSession = require('connect-pg-simple')(session);
const bodyParser = require('body-parser')
var dotenv = require('dotenv');
dotenv.config()

const app = express();
app.use(cors());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

/*
app.use(session({
  store: new pgSession({
      pool: db.pool,
  }),

  secret: "web2_lab1",
  resave: false,
  saveUninitialized: true
}))*/

//ROUTES
const authRoutes = require('./routes/auth.routes');
const competitionRoutes = require('./routes/competition.routes');

/*
const authServer = 'https://dev-zxyjma4djioibxce.us.auth0.com';
const checkJwt = auth({
  audience: 'lab1_api2',
  issuerBaseURL: `${authServer}`,
  tokenSigningAlg: "RS256"
});
app.use(checkJwt);
*/

app.use('/', authRoutes);
app.use('/competition', competitionRoutes);

const port = 8080;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});