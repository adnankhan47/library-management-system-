const express = require('express');
const booksController = require('../controllers/booksController');
const { authenticateUser } = require('../middleware/authMiddleware');  // Import the authenticateUser middleware

const router = express.Router();

router.get('/',authenticateUser,booksController.getAllBooks );
router.get('/:bookId',authenticateUser, booksController.getBookById);
router.post('/',authenticateUser, booksController.addBook);
router.put('/:bookId',authenticateUser, booksController.updateBook);
router.patch('/:bookId',authenticateUser, booksController.partialUpdateBook);

module.exports = router;
