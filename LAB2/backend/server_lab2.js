var express = require('express');
var cors = require('cors');
const path = require('path')
const bodyParser = require('body-parser')
var dotenv = require('dotenv');
dotenv.config()

const app = express();
app.use(cors());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//ROUTES
const sql_injection = require('./routes/sql_injection.routes');
const broken_authentification = require('./routes/broken_authentification.routes');

app.use('/', express.static(path.join(__dirname, 'public')))

app.use('/injection', sql_injection);
app.use('/auth', broken_authentification);

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