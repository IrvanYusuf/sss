const jwt = require("jsonwebtoken");

const authenticationToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (token === null)
    return res.status({ status_code: 401, message: "Unauthorizedff" });
  jwt.verify(token, "secret", (err, user) => {
    if (err) return res.status({ status_code: 403, message: "forbidden" });
    req.user = user;
    next();
  });
};

module.exports = authenticationToken;
