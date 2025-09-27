// Response utility functions for consistent API responses

const successResponse = (res, data = null, message = 'Success', statusCode = 200) => {
  const response = {
    success: true,
    message
  };
  
  if (data !== null) {
    response.data = data;
  }
  
  return res.status(statusCode).json(response);
};

const errorResponse = (res, error, statusCode = 500) => {
  const response = {
    success: false,
    error: typeof error === 'string' ? error : error.message || 'Internal server error'
  };
  
  // Add field info for validation errors
  if (error.field) {
    response.field = error.field;
  }
  
  return res.status(statusCode).json(response);
};

const paginatedResponse = (res, data, pagination, message = 'Success') => {
  return res.json({
    success: true,
    message,
    data,
    pagination
  });
};

const notFoundResponse = (res, resource = 'Resource') => {
  return errorResponse(res, `${resource} not found`, 404);
};

const unauthorizedResponse = (res, message = 'Unauthorized') => {
  return errorResponse(res, message, 401);
};

const validationErrorResponse = (res, error) => {
  return errorResponse(res, error, 400);
};

module.exports = {
  successResponse,
  errorResponse,
  paginatedResponse,
  notFoundResponse,
  unauthorizedResponse,
  validationErrorResponse
};
