// Global error handler middleware for consistent error format
module.exports = (err, req, res, next) => {
  // For MySQL errors, use 500; for Express errors, use the provided code
  let code = 500;
  let message = err.message || 'Internal server error.';
  
  // If err.status exists (Express error), use it
  if (err.status && typeof err.status === 'number') {
    code = err.status;
  }
  // If err.code is a number (not a MySQL error string), use it
  else if (typeof err.code === 'number') {
    code = err.code;
  }
  
  res.status(code).json({
    error: {
      code,
      message
    }
  });
};
