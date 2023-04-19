const messagesMap = {
  INVALID_FIELDS: 'Invalid fields',
  NOT_FOUND: 404,
  INVALID_DATA: 422,
  UNAUTHORIZED: 401,
  CONFLICT: 409,
};

const mapError = (type) => messagesMap[type];

module.exports = {
  mapError,
};
