import jwt from "jsonwebtoken";
import config from "./config";

const { jwtKey, jwtExpirationSeconds } = config || {};

const users = {
  user1: "zoub1",
  user2: "lun4",
  user3: "brun0"
};

const authenticate = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password || users[username] !== password) {
    res.status(401);
    return res.end();
  }

  // create a new token with the username in the payload which expires 300 seconds after issue
  const token = jwt.sign({ username }, jwtKey, {
    algorithm: "HS256",
    expiresIn: jwtExpirationSeconds
  });

  // set the cookie as the token string, with a similar max age as the token
  // the max age is in milliseconds, so we multiply by 1000
  res.cookie("token", token, { maxAge: jwtExpirationSeconds * 1000 });

  res.status(200).json({
    success: true,
    token: `Bearer ${token}`
  });
};

const refreshToken = (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).end();
  }

  let payload;

  try {
    payload = jwt.verify(token, jwtKey);
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      return res.status(401).end();
    }
    return res.status(400).end();
  }

  // ensure that a new token is not issued until enough time has elapsed
  // In this case, a new token will only be issued if the old token is within
  // 30 seconds of expiry. Otherwise, return a bad request status
  const nowUnixSeconds = Math.round(Number(new Date()) / 1000);

  if (payload.exp - nowUnixSeconds > 30) {
    return res.status(400).end();
  }

  // create a new token for the current user, with a renewed expiration time
  const newToken = jwt.sign({ username: payload.username }, jwtKey, {
    algorithm: "HS256",
    expiresIn: jwtExpirationSeconds
  });

  // set the new token as the users `token` cookie
  res.cookie("token", newToken, { maxAge: jwtExpirySeconds * 1000 });
  res.end();
};

const signout = (req, res) => {
  res.cookie("token", "");
  res.send({
    success: true
  });
};

module.exports = {
  authenticate,
  signout,
  refreshToken
};
