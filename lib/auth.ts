/**
 * 认证工具
 */

export const isAdminAuthenticated = (): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }
  
  const cookies = document.cookie.split(';');
  const authCookie = cookies.find(cookie => cookie.trim().startsWith('admin_auth='));
  
  return authCookie ? authCookie.split('=')[1] === 'true' : false;
};

export const getAdminUser = (): string | null => {
  if (typeof window === 'undefined') {
    return null;
  }
  
  const cookies = document.cookie.split(';');
  const userCookie = cookies.find(cookie => cookie.trim().startsWith('admin_user='));
  
  return userCookie ? decodeURIComponent(userCookie.split('=')[1]) : null;
};

export const logoutAdmin = (): void => {
  if (typeof window === 'undefined') {
    return;
  }
  
  document.cookie = 'admin_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  document.cookie = 'admin_user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
};

export const generateSecureCookie = (): string => {
  const secureOptions = [
    'Secure',
    'HttpOnly',
    'SameSite=Strict',
    'Path=/'
  ].join('; ');
  
  return secureOptions;
};

export const validateAdminCredentials = (email: string, password: string): boolean => {
  // 在生产环境中，应该从数据库验证
  // 这里使用环境变量或配置文件
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  
  return email === adminEmail && password === adminPassword;
};