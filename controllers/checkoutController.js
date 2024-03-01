const Checkout = require('../models/checkout');
const Book = require('../models/book');
const User = require('../models/user');
const mongoose = require('mongoose');

exports.checkoutBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    console.log(bookId);

    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return res.status(400).json({ message: 'Invalid book ID format' });
    }

    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    if (book.availableCopies <= 0) {
      return res.status(400).json({ message: 'No available copies for checkout' });
    }

    const userId = req.user.userId;

    const checkoutEntry = await Checkout.create({
      bookID: bookId,
      userID: userId,
      checkoutDate: new Date(),
      status: 'issued',
    });

    await Book.findByIdAndUpdate(bookId, { $inc: { availableCopies: -1 } });

    res.status(201).json({ message: 'Book checked out successfully', checkout: checkoutEntry });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


exports.returnBook = async (req, res) => {
  try {
    const { bookId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return res.status(400).json({ message: 'Invalid book ID format' });
    }

    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const userId = req.user.userId;
    console.log("userI=>"+userId);
    const checkoutEntry = await Checkout.findOne({
      bookID: bookId,
      userID: userId,
      status: 'issued',
    });

    if (!checkoutEntry) {
      return res.status(400).json({ message: 'Book not checked out by the user' });
    }

    // Update the checkout entry and calculate late return fine (if applicable)
    checkoutEntry.returnDate = new Date();
    console.log("checkoutEntry.returnDate=>"+checkoutEntry.returnDate);
    checkoutEntry.status = 'returned';
    console.log("checkoutEntry.checkoutDate=>"+checkoutEntry.checkoutDate);
    const dueDate = new Date(checkoutEntry.checkoutDate);
    dueDate.setDate(dueDate.getDate() + 1);  // Assuming a return period of 14 days
    console.log("dueDate=>"+dueDate);
    if (checkoutEntry.returnDate > dueDate) {
      // Calculate late return fine (adjust the fine calculation logic as needed)
      const daysLate = Math.ceil((checkoutEntry.returnDate - dueDate) / (1000 * 60 * 60 * 24));
      console.log("daysLate=>"+daysLate);
      const lateReturnFine = daysLate * 10;  // Assuming a fine of $5 per day
      console.log("lateReturnFine=>"+lateReturnFine);
      checkoutEntry.lateReturnFine = lateReturnFine;
      await User.findByIdAndUpdate(userId, { $inc: { lateReturnFine: lateReturnFine } });

     
    }

    await checkoutEntry.save();
    // Update the book's available copies
    await Book.findByIdAndUpdate(bookId, { $inc: { availableCopies: 1 } });

    res.status(200).json({ message: 'Book returned successfully', returnDetails: checkoutEntry });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
