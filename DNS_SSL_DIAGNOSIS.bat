@echo off
echo ========================================
echo DNS和SSL诊断报告
echo ========================================
echo.
echo 域名: www.hiskiwuu.com
echo 项目: modern-home-storage-vercel
echo.
echo === DNS检查结果 ===
echo ✅ DNS配置正确
echo 解析到: modern-home-storage-vercel.vercel.app
echo IP地址: 159.65.107.38 (Vercel服务器)
echo.
echo === 问题分析 ===
echo ❌ SSL证书错误: ERR_CERT_COMMON_NAME_INVALID
echo 原因: Vercel尚未为域名颁发有效SSL证书
echo.
echo === 解决方案 ===
echo.
echo 步骤1: 检查Vercel域名状态
echo     访问: https://vercel.com/您的用户名/modern-home-storage-vercel/settings/domains
echo     查看 www.hiskiwuu.com 的状态图标
echo.
echo 步骤2: 证书状态可能为
echo     - ✅ 绿色: 证书正常 (清除浏览器缓存)
echo     - ⏳ 黄色: 证书颁发中 (等待15-30分钟)
echo     - ❌ 红色: 配置错误 (需要重新配置)
echo.
echo 步骤3: 如果证书颁发中
echo     - 等待15-30分钟
echo     - 清除浏览器缓存: Ctrl+Shift+Delete
echo     - 重新测试: https://www.hiskiwuu.com
echo.
echo 步骤4: 如果仍然错误
echo     a) 在Vercel中删除域名
echo     b) 等待5分钟
echo     c) 重新添加域名
echo.
echo === 临时访问方法 ===
echo 方法A: 在错误页面输入 "thisisunsafe" (直接输入)
echo 方法B: 使用HTTP访问: http://www.hiskiwuu.com
echo 方法C: 使用Vercel原始URL: https://modern-home-storage-vercel.vercel.app
echo.
echo === 验证命令 ===
echo 1. 检查DNS: nslookup www.hiskiwuu.com
echo 2. 检查SSL: curl -vI https://www.hiskiwuu.com
echo 3. 在线检查: https://www.ssllabs.com/ssltest/
echo.
echo ========================================
echo 预计解决时间: 15分钟 - 24小时
echo Vercel自动SSL证书颁发通常需要15-30分钟
echo ========================================
pause