const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors  = require('cors');

const app = express(); // Intializing Express App

//Now Middleware
app.use(bodyParser.json()); // Parse Json Bodies

app.use(cors()); // Cross Origin

//Test Route
app.get('/', (req, res)=> {
  res.send('Backed is Running Sucessfully');
});

const PORT = 5000;
app.listen(PORT, ()=> console.log(`Server is Running on Port ${PORT}`));