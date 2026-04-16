// middlewares/errorHandler.js
import { AppError } from "../errors/AppError.js";
function errorHandler(err, req, res, next) {
  // If not an AppError, convert to 500
  if (!(err instanceof AppError)) {
    console.error('Unhandled Error:', err); // log stack
    err = new AppError('Internal Server Error', 500, 'InternalServerError');
  }

  const response = {
    success: false,
    error: {
      type: err.type || err.name,
      message: err.message,
      details: err.details || null,
      code: err.statusCode || 500,
      traceId: req.traceId || null
    }
  };

  // In dev, include stack
  if (process.env.NODE_ENV !== 'production') {
    response.error.stack = err.stack;
  }

  res.status(err.statusCode || 500).json(response);
}

export default errorHandler