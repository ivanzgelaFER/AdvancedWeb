var express = require('express');
var router = express.Router();
var axios = require('axios');
const authServer = 'https://dev-zxyjma4djioibxce.us.auth0.com';

router.get('/protected', async function(req, res) {
  const accesstoken = req.headers.authorization.split(' ')[1];
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
});

module.exports = router;