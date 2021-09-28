const errorHandler = (err, req, res, next) => {
  let statusCode,
    error = [];
  console.dir(err);
  switch (err.name) {
    // case "NOT_LOGIN":
    //   statusCode = 401;
    //   error.push("You Are Not Login");
    //   break;
    // case "USER_NOT_FOUND" :
    //   statusCode = 404;
    //   error.push("User Not Found");
    //   break;
    // case "INVALID ACCESS_TOKEN" :
    //   statusCode = 400;
    //   error.push("Invalid Access Token");
    //   break;
    // case "NOT_AUTHORIZED":
    //   statusCode = 401;
    //   error.push("You Are Not Autorized");
    //   break
    default:
      statusCode = 500;
      error.push("Internal server error");
  }
  res.status(statusCode).json({ error });
};

module.exports = errorHandler;
