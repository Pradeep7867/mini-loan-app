const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  amount: {
    type : Number,
    required : true,
  },
  term: {
    type : Number,
    required : true,
  },
  status: {
    type : String,
    default : 'PENDING', // Bydefault - > Status is Pending
  },
  repayments : [
    {
      date : Date,
      amount : Number, 
      status :{
        type : String,
        default : 'PENDING', // repayments are Pending byDefault
      },
    },
  ],
});

const Loan = mongoose.model('Loan', loanSchema);

module.exports = Loan;