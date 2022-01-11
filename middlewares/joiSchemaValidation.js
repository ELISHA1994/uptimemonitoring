
import constants from "../constants/index.js";

const validateObjectSchema = (data, schema) => {
  const result = schema.validate(data, { convert: false })
  if (result.error) {
    const errorDetails = result.error.details.map(value => {
      return {
        error: value.message,
        path: value.path
      };
    });
    return errorDetails;
  }
  return null;
}

export const validateBody = (schema) => {
  return (req, res, next) => {
    let response = { ...constants.defaultServerResponse };
    const error = validateObjectSchema(req.body, schema)
    if (error) {
      response.body = error;
      response.message = constants.requestValidationMessage.BAD_REQUEST;
      return res.status(response.status).json(response);
    }
    return next();
  }
}

export const validateQueryParams = (schema) => {
  return (req, res, next) => {
    let response = { ...constants.defaultServerResponse };
    const error = validateObjectSchema(req.query, schema)
    if (error) {
      response.body = error;
      response.message = constants.requestValidationMessage.BAD_REQUEST;
      return res.status(response.status).json(response);
    }
    return next();
  }
}