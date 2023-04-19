const { user } = require('../database/models');
const errorMap = require('../utils/errorMap');
const { insertUserValidator } = require('../utils/Validator');
const { sign } = require('../utils/jwt');

const NAME = 'display_name';

class UserService {
  constructor() {
    this.model = user;
  }

  getUserByEmail = async (email) => {
    const userFromDb = await this.model.findOne({ where: { email } });
    if (!userFromDb) return { status: errorMap.mapError('BAD_REQUEST'), payload: 'Invalid fields' };
    return { status: null, payload: userFromDb };
  };

  getAllUsers = async () => {
    const users = await this.model.findAll({ attributes: { exclude: ['password'] } });
    return { status: null, payload: users };
  };

  registerUser = async ({
    displayName, email, password, image,
  }) => {
    if (!this.model) throw new Error('Model not found');

    const validation = await insertUserValidator({ displayName, email, password });
    if (validation.status) return validation;

    const userFromDb = await this.getUserByEmail(email);
    if (!userFromDb.status) {
      return { status: errorMap.mapError('CONFLICT'), payload: 'User already registered' };
    }

    await this.model.create({
      [NAME]: displayName, email, password, image,
    });

    const token = sign(email);

    return { status: null, payload: token };
  };
}

module.exports = UserService;
