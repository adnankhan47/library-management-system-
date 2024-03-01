const express = require('express');
const checkoutController = require('../controllers/checkoutController');
const { authenticateUser } = require('../middleware/authMiddleware');  // Import the authenticateUser middleware

const router = express.Router();

// router.use(authenticateUser);

router.post('/:bookId',authenticateUser, checkoutController.checkoutBook);
router.post('/return-book/:bookId',authenticateUser, checkoutController.returnBook);

module.exports = router;
