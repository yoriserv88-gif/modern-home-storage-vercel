/**
 * 错误处理工具
 */

export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public isOperational: boolean = true
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication failed') {
    super(message, 401);
  }
}

export class ValidationError extends AppError {
  constructor(message: string = 'Validation failed') {
    super(message, 400);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found') {
    super(message, 404);
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = 'Not authorized') {
    super(message, 403);
  }
}

export const handleError = (error: unknown): { message: string; statusCode: number } => {
  if (error instanceof AppError) {
    return {
      message: error.message,
      statusCode: error.statusCode
    };
  }
  
  if (error instanceof Error) {
    return {
      message: 'An unexpected error occurred',
      statusCode: 500
    };
  }
  
  return {
    message: 'Unknown error',
    statusCode: 500
  };
};