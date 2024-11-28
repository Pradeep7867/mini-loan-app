const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors  = require('cors');
const {createLoan} = require('./controllers/loanController');
const loanRoutes = require ('./routes/loanRoutes'); //Imported Loan Routes
const app = express(); // Intializing Express App
require('dotenv').config(); // Load Enviroment 
//Now Middleware
app.use(express.json()); // Json buddies

app.use(bodyParser.json()); // Parse Json Bodies
app.use('/api/loans', loanRoutes);
app.use(cors()); // Cross Origin

const uri = process.env.MONGODB_URI;
mongoose.connect(uri).then(()=> console.log('Connected to MongoDb')).catch((err)=> console.error('Error Connecting to MongoDB ', err));

//Test Route
app.get('/', (req, res)=> {
  res.send('Backed is Running Sucessfully');
});

//app.post('/loan', createLoan); // Using createLoan Controller function

const PORT = 5000;
app.listen(PORT, ()=> console.log(`Server is Running on Port ${PORT}`));