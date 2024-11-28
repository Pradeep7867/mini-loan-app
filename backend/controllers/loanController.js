const Loan = require('../models/loanModel'); // Import the loan model

// Controller to handle loan creation
const createLoan = async (req, res) => {
    const { amount, term } = req.body;

    // Validate input data
    if (!amount || !term) {
        return res.status(400).json({ message: 'Amount and term are required' });
    }

    // Create a new loan request
    const loan = new Loan({
        amount,
        term,
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

// Export the createLoan function to be used in the routes
module.exports = { createLoan };

