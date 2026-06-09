import { validateEmail, validatePassword, ValidationError } from '@/lib/validation'

describe('Validation utilities', () => {
  describe('validateEmail', () => {
    it('should validate correct email addresses', () => {
      expect(validateEmail('test@example.com')).toBe(true)
      expect(validateEmail('user.name@domain.co.uk')).toBe(true)
      expect(validateEmail('user+tag@domain.com')).toBe(true)
    })

    it('should reject invalid email addresses', () => {
      expect(validateEmail('not-an-email')).toBe(false)
      expect(validateEmail('@domain.com')).toBe(false)
      expect(validateEmail('test@')).toBe(false)
      expect(validateEmail('test@.com')).toBe(false)
      expect(validateEmail('')).toBe(false)
    })
  })

  describe('validatePassword', () => {
    it('should validate strong passwords', () => {
      const result1 = validatePassword('StrongPass123')
      expect(result1.valid).toBe(true)
      expect(result1.errors).toEqual([])

      const result2 = validatePassword('Another123')
      expect(result2.valid).toBe(true)
      expect(result2.errors).toEqual([])
    })

    it('should reject weak passwords', () => {
      const result1 = validatePassword('short')
      expect(result1.valid).toBe(false)
      expect(result1.errors).toContain('Password must be at least 6 characters long')

      const result2 = validatePassword('nouppercase123')
      expect(result2.valid).toBe(false)
      expect(result2.errors).toContain('Password must contain at least one uppercase letter')

      const result3 = validatePassword('NoNumbers')
      expect(result3.valid).toBe(false)
      expect(result3.errors).toContain('Password must contain at least one number')

      const result4 = validatePassword('A1')
      expect(result4.valid).toBe(false)
      expect(result4.errors).toContain('Password must be at least 6 characters long')
    })
  })
})

describe('ValidationError', () => {
  it('should create a ValidationError instance', () => {
    const error = new ValidationError('Test error')
    expect(error).toBeInstanceOf(Error)
    expect(error).toBeInstanceOf(ValidationError)
    expect(error.name).toBe('ValidationError')
    expect(error.message).toBe('Test error')
  })
})