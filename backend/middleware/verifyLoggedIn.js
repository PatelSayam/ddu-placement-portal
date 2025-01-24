const session = require("express-session");
const env = require("dotenv");
env.config();

const verifyLoggedIn = (req, res, next) => {
  if (req.session.isStudent || req.session.isAdmin) {
    console.log("loggedin");
    next();
  } else {
    console.log("not loggedin");
    return res.redirect("/");
  }
};

module.exports = verifyLoggedIn;

