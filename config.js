module.exports = {
  jwtSecret: process.env.ACCESS_TOKEN_SECRET || 'default_jwt_secret',
  lateFineIncrement: 10, // Late return fine increment in Rs
};
