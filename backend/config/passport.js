const jwt = require('jsonwebtoken');
const { secretOrKey }  = require('./keys');

export async function loginUser(user) {
  const userInfo = {
    _id: user._id,
    username: user.username,
    email: user.email
  };
  const token = await jwt.sign(
    userInfo,
    secretOrKey,
    { expiresIn: 3600 }
  );
  return {
    user: userInfo,
    token
  };
};