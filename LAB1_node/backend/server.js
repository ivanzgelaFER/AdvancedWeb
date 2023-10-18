const cors = require('cors');
const express = require('express');
import { auth, requiresAuth } from 'express-openid-connect'; 

const app = express();
const port = 5000;
app.use(cors());

app.get('/api/login', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});