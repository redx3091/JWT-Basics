const CustomAPIError = require('../errors/custom-error');
const JWT = require('jsonwebtoken');

const login = async (req, res) => {
  const { username, password } = req.body;
  //* Mongoose validation
  //* Joi
  //* check in the controller
  if (!username || !password) {
    throw new CustomAPIError('Please provide email and password', 400);
  }
  //! is demo th DB provided us!!
  const id = new Date().getDate();

  const token = JWT.sign({id, username}, process.env.JWT_SECRET, {expiresIn:'30d'});

  res.status(200).json({msg:'User created', token})
};

const dashboard = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new CustomAPIError('No token provided', 401);
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = JWT.verify(token, process.env.JWT_SECRET);

    const luckyNumber = Math.floor(Math.random() * 100);

    res.status(200).json({
      msg: `Hello, ${decoded.username}`,
      secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
    });
  } catch (error) {
    throw new CustomAPIError('Not authorized to acces this route', 401);
  }

};

module.exports = {
  login,
  dashboard,
};
