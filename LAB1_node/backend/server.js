var express = require('express');
var cors = require('cors');
const { auth } = require('express-oauth2-jwt-bearer');
var indexRouter = require('./routes/index.js');
var dotenv = require('dotenv');
dotenv.config()

const app = express();
app.use(cors());

const authServer = 'https://dev-zxyjma4djioibxce.us.auth0.com';

const checkJwt = auth({
  audience: 'lab1_api2',
  issuerBaseURL: `${authServer}`,
  tokenSigningAlg: "RS256"
});
app.use(checkJwt);

app.use('/', indexRouter);

const port = 8080;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});