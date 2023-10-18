var express = require('express');
var { auth } = require('express-openid-connect');
var requiresAuth = require('express-openid-connect'); 
var dotenv = require('dotenv');
var cors = require('cors');
var indexRouter = require('./routes/index.js');

dotenv.config()
const port = 8080;

const app = express();
app.set('views', 'views');
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cors());

const config = { 
  authRequired : false,
  auth0Logout : true,
  //idpLogout : true,
  secret: process.env.SECRET,
  baseURL: `http://localhost:${port}`,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: 'https://dev-zxyjma4djioibxce.us.auth0.com',
  /*clientSecret: process.env.CLIENT_SECRET,
  authorizationParams: {
    response_type: 'code' ,
    //scope: "openid profile email"   
   },*/
};

app.use(auth(config));

app.use('/', indexRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});