const jsonWebToken = require("jsonwebtoken");

const generateToken = (id) => {
  return jsonWebToken.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}


module.exports = generateToken;
