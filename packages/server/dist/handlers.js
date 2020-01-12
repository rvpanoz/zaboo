"use strict";

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  jwtKey,
  jwtExpirationSeconds
} = _config.default || {};
const users = {
  user1: "zoub1",
  user2: "lun4",
  user3: "brun0"
};

const authenticate = (req, res) => {
  const {
    username,
    password
  } = req.body;

  if (!username || !password || users[username] !== password) {
    res.status(401);
    return res.end();
  } // create a new token with the username in the payload which expires 300 seconds after issue


  const token = _jsonwebtoken.default.sign({
    username
  }, jwtKey, {
    algorithm: "HS256",
    expiresIn: jwtExpirationSeconds
  }); // set the cookie as the token string, with a similar max age as the token
  // the max age is in milliseconds, so we multiply by 1000


  res.cookie("token", token, {
    maxAge: jwtExpirationSeconds * 1000
  });
  res.status(200).json({
    success: true,
    token: `Bearer ${token}`
  });
};

const home = (req, res) => {
  // obtain the session token from the requests cookies, which come with every request
  const token = req.cookies.token;
  console.log(token); // if the cookie is not set, return an unauthorized error

  if (!token) {
    return res.status(401).end();
  }

  let payload;

  try {
    // Parse the JWT string and store the result in `payload`.
    // Note that we are passing the key in this method as well. This method will throw an error
    // if the token is invalid (if it has expired according to the expiry time we set on sign in),
    // or if the signature does not match
    payload = _jsonwebtoken.default.verify(token, jwtKey);
  } catch (e) {
    if (e instanceof _jsonwebtoken.default.JsonWebTokenError) {
      // if the error thrown is because the JWT is unauthorized, return a 401 error
      return res.status(401).end();
    } // otherwise, return a bad request error


    return res.status(400).end();
  } // Finally, return the welcome message to the user, along with their
  // username given in the token


  res.send(`Welcome ${payload.username}!`);
};

const refresh = (req, res) => {
  // (BEGIN) The code until this point is the same as the first part of the `home` route
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).end();
  }

  var payload;

  try {
    payload = _jsonwebtoken.default.verify(token, jwtKey);
  } catch (e) {
    if (e instanceof _jsonwebtoken.default.JsonWebTokenError) {
      return res.status(401).end();
    }

    return res.status(400).end();
  } // (END) The code until this point is the same as the first part of the `home` route
  // We ensure that a new token is not issued until enough time has elapsed
  // In this case, a new token will only be issued if the old token is within
  // 30 seconds of expiry. Otherwise, return a bad request status


  const nowUnixSeconds = Math.round(Number(new Date()) / 1000);

  if (payload.exp - nowUnixSeconds > 30) {
    return res.status(400).end();
  } // Now, create a new token for the current user, with a renewed expiration time


  const newToken = _jsonwebtoken.default.sign({
    username: payload.username
  }, jwtKey, {
    algorithm: "HS256",
    expiresIn: jwtExpirationSeconds
  }); // Set the new token as the users `token` cookie


  res.cookie("token", newToken, {
    maxAge: jwtExpirySeconds * 1000
  });
  res.end();
};

module.exports = {
  authenticate,
  home,
  refresh
};