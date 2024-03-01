const mongoose = require('mongoose');

const checkoutSchema = new mongoose.Schema({
  bookID: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
  userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  checkoutDate: { type: Date, default: Date.now },
  returnDate: Date,
  status: { type: String, enum: ['issued', 'returned'], default: 'issued' },
});

module.exports = mongoose.model('Checkout', checkoutSchema);
