const errorHandler = (err, req, res, next) => {
  let statusCode,
    error = [];
  switch (err.name) {
    default:
      statusCode = 500;
      error.push("Internal server error");
  }
  res.status(statusCode).json({ error });
};

module.exports = errorHandler;
