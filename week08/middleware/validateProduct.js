// Validation middleware for product creation
module.exports = (req, res, next) => {
  const { name, price, stock } = req.body;
  
  // Check required fields and valid values
  if (!name || price == null || stock == null || price < 0 || stock < 0) {
    return res.status(400).json({
      error: {
        code: 400,
        message: 'Invalid product data.'
      }
    });
  }
  
  // Validation passed, proceed to next middleware/controller
  next();
};
