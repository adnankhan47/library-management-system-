
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const cron = require('node-cron');
const lateReturnCron = require('./cronJobs/lateReturnCron');
const { authenticateUser } = require('./middleware/authMiddleware');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/library', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Check MongoDB connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


// Routes
const authRoutes = require('./routes/auth');
const booksRoutes = require('./routes/books');
const checkoutRoutes = require('./routes/checkout');

app.use('/library', authRoutes);
app.use('/library/books', booksRoutes);
app.use('/library/checkout', checkoutRoutes);




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

