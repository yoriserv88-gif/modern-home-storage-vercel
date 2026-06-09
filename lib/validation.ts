/**
 * 表单验证工具
 */

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (password.length < 6) {
    errors.push('Password must be at least 6 characters long');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
};

export const validateForm = (data: Record<string, any>, rules: Record<string, Function>): Record<string, string[]> => {
  const errors: Record<string, string[]> = {};
  
  Object.entries(rules).forEach(([field, validator]) => {
    const result = validator(data[field]);
    if (typeof result === 'string' && result) {
      errors[field] = [result];
    } else if (typeof result === 'object' && result.errors && result.errors.length > 0) {
      errors[field] = result.errors;
    }
  });
  
  return errors;
};