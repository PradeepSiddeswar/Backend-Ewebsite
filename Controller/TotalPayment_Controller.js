// paymentController.js
const TotalPayment = require('../Model/TotalPayment_Model');

// Create a new payment
exports.createPayment = async (req, res) => {
    try {
      const payment = new TotalPayment(req.body);
      const savedPayment = await payment.save();
      res.status(201).json(savedPayment);
    } catch (error) {
      console.error('Error creating payment:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

// Get total payments
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await TotalPayment.find(); // Retrieve all payments from the collection

    // Calculate the total payment amount
    const totalPaymentAmount = payments.reduce((total, payment) => {
      return total + payment.amount;
    }, 0);

    // Map over the payments array and modify the status field
    const modifiedPayments = payments.map(payment => {
      if (payment.status === "Completed") {
        payment.status = "Failed";
      }
      return payment;
    });

    // Create the response JSON object
    const response = {
      totalPaymentAmount: totalPaymentAmount,
      payments: modifiedPayments, // Use the modifiedPayments array
    };

    res.status(200).json(response); // Respond with the response object
  } catch (error) {
    console.error('Error getting payments:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.get = async (req, res) => {
  try {
    // Calculate the start and end of today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const totalPayments = await TotalPayment.aggregate([
      {
        $match: {
          payment_date: {
            $gte: today,
            $lt: tomorrow,
          },
        },
      },
      {
        $group: {
          _id: 'totalPayments',
          totalPaymentReceivedToday: { $sum: '$amount' },
          payments: {
            $push: {
              _id: '$_id',
              customer_name: '$customer_name',
              amount: '$amount',
              payment_date: '$payment_date',
              status: '$status',
            },
          },
        },
      },
    ]);

    if (totalPayments.length === 0) {
      return res.status(404).json({ error: 'No payments received today' });
    }

    res.status(200).json(totalPayments[0]); // Include totalPaymentReceivedToday, customer names, amounts, and statuses
  } catch (error) {
    console.error('Error getting total payments received today:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


  // update id 
exports.update = async (req, res) => {
  if (!req.body) {
      res.status(400).send("User Address not found")
  }
  const id = req.params.id
  TotalPayment.findByIdAndUpdate(id, req.body, { new: true })
      .then(data => {
          if (!data) {
              res.status(400).send(`Can not found user Address with ${id}`)
          } else {
              res.send(data)
          }
      })
      .catch(error => {
          res.status(500).send(error)
      })
}

// delete method
exports.delete = (req, res) => {
  const id = req.params.id
  TotalPayment.findByIdAndDelete(id)
      .then(data => {
          if (!data) {
              res.status(400).send(`category not found with ${id}`)
          } else {
              res.send("category deleted successfully")
          }
      })
      .catch(error => {
          res.status(500).send(error)
      })
}
