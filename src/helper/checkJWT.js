const jwt = require("jsonwebtoken");

const checkJWT = (token) => {
  try {
    const data = jwt.verify(token, process.env.JWT_PASSWORD);
    return data;
  } catch (err) {
    return false;
  }
};

module.exports = checkJWT;
