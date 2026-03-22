// Global error handler middleware for consistent error format
module.exports = (err, req, res, _next) => {
  const code = err.status || err.code || 500;
  const message = err.message || 'Internal server error.';
  res.status(code).json({
    error: {
      code,
      message
    }
  });
};
