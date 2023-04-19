const Joi = require('joi');
const errorMap = require('./errorMap');

const registerSchema = Joi.object({
  displayName: Joi.string()
    .min(8)
    .required()
    .messages({
      'string.min': '"displayName" length must be at least 8 characters long',
    }),
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': '"email" must be a valid email',
    }),
  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.min': '"password" length must be at least 6 characters long',
    }),
});

const insertUserValidator = async ({ displayName, email, password }) => {
  try {
    await registerSchema.validateAsync({ displayName, email, password });
    return { status: null };
  } catch (err) {
    return { status: errorMap.mapError('BAD_REQUEST'), payload: err.message };
  }
};

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': '"email" must be a valid email',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': '"password" length must be at least 6 characters long',
  }),
});

const loginValidator = async (userRq, userDb) => {
  try {
    const { email, password } = userRq;
    await loginSchema.validateAsync({ email, password });

    const { payload: { dataValues } } = userDb;
    if (dataValues.password !== password || dataValues.email !== email) {
      return { status: errorMap.mapError('BAD_REQUEST'), payload: 'Invalid fields' };
    }
    return { status: null, payload: null };
  } catch (err) {
    return { status: errorMap.mapError('BAD_REQUEST'), payload: err.message };
  }
};

module.exports = {
  loginValidator,
  insertUserValidator,
};
