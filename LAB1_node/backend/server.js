var express = require('express');
var cors = require('cors');
const path = require('path')
const { auth } = require('express-oauth2-jwt-bearer');
//const pg = require('pg');
//const db = require('./db');
const session = require('express-session');
//const pgSession = require('connect-pg-simple')(session);
const bodyParser = require('body-parser')
var dotenv = require('dotenv');
const corsOptions = require('./config/corsOptions')
dotenv.config()

const app = express();
app.use(cors());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

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
app.use('/', express.static(path.join(__dirname, 'public')))

app.use('/', authRoutes);
app.use('/competition', competitionRoutes);

app.all('*', (req, res) => {
  res.status(404)
  if (req.accepts('html')) {
      res.sendFile(path.join(__dirname, 'views', '404.html'))
  } else if (req.accepts('json')) {
      res.json({ message: '404 Not Found' })
  } else {
      res.type('txt').send('404 Not Found')
  }
})

const externalUrl = process.env.RENDER_EXTERNAL_URL;
const port = externalUrl && process.env.PORT ? parseInt(process.env.PORT) : 8080;
if (externalUrl) {
  const hostname = '0.0.0.0'; //ne 127.0.0.1
  app.listen(port, hostname, () => {
  console.log(`Server locally running at http://${hostname}:${port}/ and from
  outside on ${externalUrl}`);
})} else {  
    const hostname = 'localhost';
    app.listen(port, hostname, () => {
    console.log(`Server locally running at http://${hostname}:${port}`);
  })
}