const Loan = require('../models/loanModel'); // Import the loan model

// Controller to handle loan creation
const createLoan = async (req, res) => {
    const { amount, term, userId } = req.body;

    // Validate input data
    if (!amount || !term || !userId ) {
        return res.status(400).json({ message: 'Amount and term and userId are required' });
    }

    // Create a new loan request
    const loan = new Loan({
        amount,
        term,
        userId: String(userId),
    });

    // Generate repayment schedule (weekly repayments)
    const weeklyRepaymentAmount = amount / term;
    const repayments = [];
    let repaymentDate = new Date();
    repaymentDate.setDate(repaymentDate.getDate() + 7); // Set first repayment date to 1 week from now

    // Create repayment schedule
    for (let i = 0; i < term; i++) {
        repayments.push({
            date: repaymentDate,
            amount: weeklyRepaymentAmount,
        });
        repaymentDate.setDate(repaymentDate.getDate() + 7); // Set next repayment date (add 7 days)
    }

    loan.repayments = repayments;

    // Save the loan request to the database
    try {
        await loan.save();
        res.status(201).json(loan); // Send the created loan back in the response
    } catch (error) {
        res.status(500).json({ message: 'Failed to save loan request' });
    }
};

// Controller to Appove a Loan
const approveLoan  = async (req, res)=> {
  const {loanId}  = req.params; // loan Id passed as a Parameter
  try {
    //Find And Update the Loan Status to Approved
    const loan  = await Loan.findByIdAndUpdate(
      loanId, 
      { status : 'Approved'},
      {new : true} // Return the Upadated Document
    );
    if(!loan)
    {
      return  res.status(404).json({ message : "Loan Not Found"});
      console.log("Kuch toh Gadabad Hai Check Loan ID");
    }
    res.status(200).json(loan); // Send the Updated Loan in the Response
  }
  catch(error)
  {
    res.status(500).json({message : 'Failed To Approve Loan', error});
  }
};

// Controller to get loans for a specific user
const getMyLoans = async (req, res) => {
  const {userId} = req.query; // Assume the userId is passed in query params

  //testingUserID
  console.log("Recieved userId : ", userId);

  if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
  }

  try {
      // Fetch loans for the user
      const loans = await Loan.find({ userId : userId});

      if (loans.length === 0) {
          return res.status(404).json({ message: 'No loans found for this user' });
      }

      res.status(200).json(loans); // Send the loans back in the response
  } catch (error) {
      res.status(500).json({ message: 'Failed to fetch loans', error });
  }
};




// Export the createLoan function to be used in the routes
module.exports = { createLoan, approveLoan, getMyLoans };

