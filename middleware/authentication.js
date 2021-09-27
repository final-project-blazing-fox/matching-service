const jwt = require("jsonwebtoken");
const authentication = async (req, res, next) => {
  // console.log(req.headers.access_token);

  if (!req.headers.access_token) {
    return next(new Error({ name: "NOT_LOGIN" }));
  }

  try {
    const decoded = await jwt.verify(
      req.headers.access_token,
      process.env.JWT_SECRET
    );

    if (decoded) {
      req.userId = decoded.id;
      next();
    }
  } catch (err) {
    next({ name: "INVALID_ACCESS_TOKEN" });
  }
};

module.exports = authentication;
