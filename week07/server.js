// Entry point for the Express server
const express = require('express');
const app = express();
const logger = require('./middleware/logger');
const timingMiddleware = require('./timingMiddleware');

app.use(timingMiddleware);

app.use(express.json());
app.use(logger);

// Routes
app.use('/products', require('./routes/products'));
app.use('/orders', require('./routes/orders'));

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({
    error: {
      code: 404,
      message: 'Resource not found.'
    }
  });
});

// Global error handler
app.use(require('./middleware/errorHandler'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});