const errorMap = {
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INVALID_DATA: 422,
  UNAUTHORIZED: 401,
  CONFLICT: 409,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  mapError,
};
