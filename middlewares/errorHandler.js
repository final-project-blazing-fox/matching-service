const errorHandler = (err, req, res, next) => {
  let statusCode,
    error = [];
  switch (err.name) {
    case "UNAUTHENTICATED":
      statusCode = 401;
      error.push("Authentication token is not valid or exists");
      break;
    case "UNAUTHORIZED":
      statusCode = 404;
      error.push(`Unauthorized task`);
      break;
    default:
      statusCode = 500;
      error.push("Internal server error");
  }
  res.status(statusCode).json({ error });
};

module.exports = errorHandler;
