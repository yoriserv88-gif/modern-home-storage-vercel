import { validateAdminCredentials, isAdminAuthenticated, getAdminUser, logoutAdmin } from '@/lib/auth'

// Mock document.cookie
const mockCookie = {
  get: jest.fn(),
  set: jest.fn(),
  clear: jest.fn(),
}

describe('Authentication utilities', () => {
  beforeEach(() => {
    // Reset mocks
    mockCookie.get.mockClear()
    mockCookie.set.mockClear()
    mockCookie.clear.mockClear()
    
    // Mock document.cookie
    Object.defineProperty(document, 'cookie', {
      writable: true,
      value: '',
    })
  })

  describe('validateAdminCredentials', () => {
    beforeEach(() => {
      // Reset environment variables
      delete process.env.ADMIN_EMAIL
      delete process.env.ADMIN_PASSWORD
    })

    it('should validate correct default credentials', () => {
      expect(validateAdminCredentials('admin@example.com', 'admin123')).toBe(true)
    })

    it('should reject incorrect credentials', () => {
      expect(validateAdminCredentials('wrong@email.com', 'admin123')).toBe(false)
      expect(validateAdminCredentials('admin@example.com', 'wrongpassword')).toBe(false)
      expect(validateAdminCredentials('', '')).toBe(false)
    })

    it('should use environment variables when available', () => {
      process.env.ADMIN_EMAIL = 'custom@admin.com'
      process.env.ADMIN_PASSWORD = 'custom123'
      
      expect(validateAdminCredentials('custom@admin.com', 'custom123')).toBe(true)
      expect(validateAdminCredentials('admin@example.com', 'admin123')).toBe(false)
    })
  })

  describe('isAdminAuthenticated', () => {
    it('should return false when no cookie exists', () => {
      document.cookie = ''
      expect(isAdminAuthenticated()).toBe(false)
    })

    it('should return false when cookie is not set to true', () => {
      document.cookie = 'admin_auth=false'
      expect(isAdminAuthenticated()).toBe(false)
      
      document.cookie = 'admin_auth='
      expect(isAdminAuthenticated()).toBe(false)
    })

    it('should return true when cookie is set to true', () => {
      document.cookie = 'admin_auth=true'
      expect(isAdminAuthenticated()).toBe(true)
      
      document.cookie = 'admin_auth=true; other_cookie=value'
      expect(isAdminAuthenticated()).toBe(true)
    })

    it('should handle cookies with spaces correctly', () => {
      document.cookie = ' admin_auth = true '
      expect(isAdminAuthenticated()).toBe(true)
    })
  })

  describe('getAdminUser', () => {
    it('should return null when no user cookie exists', () => {
      document.cookie = ''
      expect(getAdminUser()).toBe(null)
    })

    it('should return decoded user email when cookie exists', () => {
      document.cookie = 'admin_user=admin%40example.com'
      expect(getAdminUser()).toBe('admin@example.com')
      
      document.cookie = 'admin_user=custom%40admin.com; admin_auth=true'
      expect(getAdminUser()).toBe('custom@admin.com')
    })

    it('should handle encoded special characters', () => {
      document.cookie = 'admin_user=test%2Buser%40domain.com'
      expect(getAdminUser()).toBe('test+user@domain.com')
    })
  })

  describe('logoutAdmin', () => {
    it('should clear authentication cookies', () => {
      document.cookie = 'admin_auth=true; admin_user=test@example.com; other_cookie=value'
      
      logoutAdmin()
      
      // Check that the cookies are cleared (expired)
      expect(document.cookie).toContain('admin_auth=;')
      expect(document.cookie).toContain('admin_user=;')
      expect(document.cookie).toContain('expires=Thu, 01 Jan 1970 00:00:00 GMT')
    })
  })
})