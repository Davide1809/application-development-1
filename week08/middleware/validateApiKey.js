// API Key validation middleware
module.exports = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  
  if (!apiKey || apiKey !== '12345') {
    return res.status(401).json({
      error: {
        code: 401,
        message: 'Unauthorized. Invalid or missing API key.'
      }
    });
  }
  
  // API key is valid, proceed to next middleware/controller
  next();
};
