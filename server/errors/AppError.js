// errors/AppError.js
class AppError extends Error {
  constructor(message, statusCode = 500, type = 'InternalServerError', details = null) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.type = type;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}

class BadRequestError extends AppError {
  constructor(message = 'Bad Request', details = null) {
    super(message, 400, 'BadRequestError', details);
  }
}
class MissingDetailsError extends AppError{
    constructor(message="Please fill all reqired fields",details=null){
        super(message,400,"MissingDetailsError",details);
    }}
class AlreadyExistsError extends AppError{
    constructor(message="User ALready exists",details=null){
        super(message,403,"AlreadyExistsError",details);
    }
}
class NotFoundError extends AppError {
  constructor(message = 'Not Found', details = null) {
    super(message, 404, 'NotFoundError', details);
  }
}
class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized', details = null) {
    super(message, 401, 'UnauthorizedError', details);
  }
}
class ForbiddenError extends AppError {
  constructor(message = 'Forbidden', details = null) {
    super(message, 403, 'ForbiddenError', details);
  }
}
class ConflictError extends AppError {
  constructor(message = 'Conflict', details = null) {
    super(message, 409, 'ConflictError', details);
  }
}
class ExternalServiceError extends AppError {
  constructor(message = 'External Service Error', details = null) {
    super(message, 502, 'ExternalServiceError', details);
  }
}

export {
  AppError,
  BadRequestError,
  MissingDetailsError,
  AlreadyExistsError,
  NotFoundError,
  UnauthorizedError,
  ForbiddenError,
  ConflictError,
  ExternalServiceError
};
