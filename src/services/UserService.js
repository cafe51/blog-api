const { user } = require('../database/models');
const errorMap = require('../utils/errorMap');
const { insertUserValidator } = require('../utils/validator');
const { sign } = require('../utils/jwt');

const NAME = 'display_name';

class UserService {
  constructor() {
    this.model = user;
  }

  async getUserByEmail(email) {
    const userFromDb = await this.model.findOne({ where: { email } });
    if (!userFromDb) return { status: errorMap.mapError('BAD_REQUEST'), payload: 'Invalid fields' };
    return { status: null, payload: userFromDb };
  }

  async getAllUsers() {
    const users = await this.model.findAll({ attributes: { exclude: ['password'] } });
    return { status: null, payload: users };
  }

  async getUserById(id) {
    const userFoundByPk = await this.model.findByPk(
      id,
      { attributes: { exclude: ['password'] } },
    );
    if (!userFoundByPk) return { status: errorMap.mapError('NOT_FOUND'), payload: 'User does not exist' };
    return { status: null, payload: userFoundByPk };
  }

  async registerUser({
    displayName, email, password, image,
  }) {
    const validation = await insertUserValidator({ displayName, email, password });
    if (validation.status) return validation;

    const [, created] = await this.model.findOrCreate({
      where: { email },
      defaults: {
        [NAME]: displayName,
        password,
        image,
      },
    });

    if (!created) {
      return { status: errorMap.mapError('CONFLICT'), payload: 'User already registered' };
    }

    const userFounded = await this.getUserByEmail(email);

    const token = sign(userFounded.payload.dataValues);

    // const token = sign(
    //   {
    //     [NAME]: displayName,
    //     email,
    //     password,
    //     image,
    //   },
    // );

    return { status: null, payload: { token } };
  }

  async deleteUserByMe(id) {
    await this.model.destroy({ where: { id } });
    return { status: null, payload: null };
  }
}

module.exports = UserService;
