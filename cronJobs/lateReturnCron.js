// lateReturnCrone.js
const cron = require('node-cron');
const Checkout = require('../models/checkout');
const User = require('../models/user');

// Define the cron job to run every 24 hours
cron.schedule('0 0 * * *', async () => {
  try {
    // Find overdue checkouts
    const overdueCheckouts = await Checkout.find({
      status: 'issued',
      returnDate: { $lt: new Date() },
    });

    // Update late return fines for overdue checkouts
    for (const checkout of overdueCheckouts) {
      const dueDate = new Date(checkout.checkoutDate);
      dueDate.setDate(dueDate.getDate() + 1);  // Assuming a return period of 1 day

      const daysLate = Math.ceil((new Date() - dueDate) / (1000 * 60 * 60 * 24));
      const lateReturnFine = daysLate * 10;  // Assuming a fine of Rs. 10 per day

      checkout.lateReturnFine = lateReturnFine;
      await checkout.save();

      const userId = checkout.userID;  

      // Update the user's late return fine
      await User.findByIdAndUpdate(userId, { $inc: { lateReturnFine: lateReturnFine } });
    }

    console.log('Late return fines updated successfully');
  } catch (error) {
    console.error('Error updating late return fines:', error);
  }
});

module.exports = cron;
