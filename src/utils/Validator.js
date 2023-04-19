const { mapError } = require('./errorMap');
const { registerSchema, loginSchema } = require('./schemas');

const insertUserValidator = async ({ displayName, email, password }) => {
  try {
    await registerSchema.validateAsync({ displayName, email, password });
    return { status: null };
  } catch (err) {
    return { status: mapError('BAD_REQUEST'), payload: err.message };
  }
};

const emailAndPasswordValidator = async (email, password) => {
  await loginSchema.validateAsync({ email, password });
};

const loginAuthenticator = async (userRq, userDb) => {
  try {
    const { email, password } = userRq;

    const { payload: { dataValues } } = userDb;
    if (dataValues.password !== password || dataValues.email !== email) {
      return { status: mapError('BAD_REQUEST'), payload: 'Invalid fields' };
    }
    return { status: null, payload: null };
  } catch (err) {
    return { status: mapError('BAD_REQUEST'), payload: err.message };
  }
};

module.exports = {
  loginAuthenticator,
  insertUserValidator,
  emailAndPasswordValidator,
};
