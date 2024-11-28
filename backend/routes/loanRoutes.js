const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loanController');

//Route to Create a Loan

router.post('/create-loan', loanController.createLoan);

//Future Routes will go here

module.exports= router;

