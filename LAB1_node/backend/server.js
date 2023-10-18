var express = require('express');
var dotenv = require('dotenv');
var cors = require('cors');
//var indexRouter = require('./routes/index.js');
const { auth } = require('express-oauth2-jwt-bearer');
dotenv.config()

const port = 8080;

const app = express();
app.set('views', 'views');
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cors());
const authServer = 'https://dev-zxyjma4djioibxce.us.auth0.com/';

const checkJwt = auth({
  secret: 'JVTbd27twEYl3RJN2e3yCGnzeYgsferc',
  audience: 'lab1_api',
  issuerBaseURL: `${authServer}`,
  tokenSigningAlg: 'HS256'
});
app.use(checkJwt);

app.get('/protected', async function(req, res) {
  console.log("aaaaaaaaaaaaaaaaaaaaaa")
  const accesstoken = req.auth.token;
  try{
    const userInfoResponse = await axios.post(`${authServer}/userinfo`, {},  {
                                                    headers : {
                                                        Authorization : `Bearer ${accesstoken}`
                                                    }}); 
     const user = userInfoResponse.data;    
     res.json(JSON.stringify(user));               
  }
  catch(err) {
    console.log(err);
  } 
  /*
  res.json({user: {},
            title: "Ivan Zgela Auth demo project"
  });
    
    //res.render("index", {title: "Ivan Zgela Auth demo project", isAuthenticated: req.oidc.isAuthenticated()});
*/
});

/*
const config = { 
  authRequired : false,
  auth0Logout : true,
  //idpLogout : true,
  secret: process.env.SECRET,
  baseURL: `http://localhost:${port}`,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: 'https://dev-zxyjma4djioibxce.us.auth0.com',
  clientSecret: process.env.CLIENT_SECRET,
  authorizationParams: {
    response_type: 'code' ,
    //scope: "openid profile email"   
   },
};
app.use(auth(config));
*/

//app.use('/', indexRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});