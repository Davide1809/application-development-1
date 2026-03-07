// Validation middleware for order creation
module.exports = (req, res, next) => {
  const { userId, items, total } = req.body;

  if (!userId || !Array.isArray(items) || items.length === 0 || total == null) {
    return res.status(400).json({
      error: {
        code: 400,
        message: 'Invalid order data.'
      }
    });
  }

  next();
};