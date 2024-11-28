const express = require('express');
const router = express.Router();

const {createLoan, approveLoan, getMyLoans} = require('../controllers/loanController');

//Route to Create a Loan

router.post('/create-loan', createLoan);

//Route to Approve a Loan by ID
router.patch('/approve-loan/:loanId', approveLoan);

//Route to get Loans for a Specific user
router.get('/my-loans', getMyLoans);


//Future Routes will go here
module.exports= router;

