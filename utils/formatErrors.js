import _ from 'lodash';

// Grabs the error and path from user models if validation error
export const formatErrors = (error, models) => {
  if (error instanceof models.sequelize.ValidationError) {
    return error.errors.map( error => _.pick(error, ['path', 'message']));
  }
  return [{path: 'nonValidationError', message: 'Jordy: Something went wrong (but not a validation error)'}]
};