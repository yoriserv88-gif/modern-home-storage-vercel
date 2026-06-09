# SSL证书错误解决方案
# 域名: www.hiskiwuu.com
# 错误: ERR_CERT_COMMON_NAME_INVALID

## 问题诊断
✅ DNS已配置：域名能解析到Vercel
❌ SSL证书问题：Vercel尚未为域名颁发有效证书

## 解决步骤

### 第1步：登录Vercel检查域名状态
1. 访问: https://vercel.com/dashboard/domains
2. 或直接: https://vercel.com/您的用户名/modern-home-storage-vercel/settings/domains
3. 查找 `www.hiskiwuu.com` 的状态

### 第2步：检查域名状态图标
- ✅ 绿色勾: 证书正常（可能需要清除浏览器缓存）
- ⏳ 时钟图标: 证书正在颁发（等待15-30分钟）
- ❌ 红色叉: 配置错误
- ⚠️ 黄色警告: DNS配置问题

### 第3步：重新配置域名（如果需要）
1. **删除现有配置**（如果存在）:
   - 点击域名旁边的"..."菜单
   - 选择"Remove"
   - 确认删除

2. **重新添加域名**:
   - 点击"Add Domain"
   - 输入: `www.hiskiwuu.com`
   - 点击"Add"

### 第4步：等待证书颁发
时间线:
- 0-5分钟: Vercel开始申请证书
- 5-15分钟: 证书颁发中
- 15-30分钟: 证书生效
- 最长24小时: 全球传播完成

### 第5步：测试访问
1. **清除浏览器缓存**:
   - Chrome: Ctrl+Shift+Delete → 清除缓存和Cookie
   - 或使用隐私模式访问

2. **测试链接**:
   ```
   https://www.hiskiwuu.com
   ```

3. **使用在线SSL检查工具**:
   - https://www.ssllabs.com/ssltest/
   - 输入: `www.hiskiwuu.com`

## 快速修复方法

### 方法A：强制刷新（立即尝试）
1. 访问: https://www.hiskiwuu.com
2. 看到错误页面时，在地址栏输入:
   ```
   thisisunsafe
   ```
   （直接输入，不按回车）
3. 页面会自动刷新并允许访问

### 方法B：使用HTTP临时访问
暂时使用（不推荐长期）:
```
http://www.hiskiwuu.com
```
注意: 没有"s"，是http不是https

### 方法C：检查DNS配置
使用命令提示符:
```cmd
nslookup www.hiskiwuu.com
```
应该显示指向 `cname.vercel-dns.com`

## 常见问题解决

### 问题1：证书一直不生效
**解决**:
1. 检查DNS是否正确: CNAME → cname.vercel-dns.com
2. 确保没有其他A记录冲突
3. 联系Vercel支持: support@vercel.com

### 问题2：只有www有证书，根域名没有
**解决**:
1. 同时添加两个域名:
   - `hiskiwuu.com` (A记录: 76.76.21.21)
   - `www.hiskiwuu.com` (CNAME记录)
2. Vercel会为两个域名颁发证书

### 问题3：浏览器缓存问题
**解决**:
1. Chrome: Ctrl+Shift+Delete → 时间范围"所有时间" → 清除
2. 或使用其他浏览器测试

## 验证步骤

### 步骤1：检查DNS
```
命令: nslookup www.hiskiwuu.com
预期结果: cname.vercel-dns.com
```

### 步骤2：检查SSL证书
```
访问: https://www.hiskiwuu.com
预期: 绿色锁图标 ✅
```

### 步骤3：检查Vercel状态
```
访问: Vercel域名页面
预期: 绿色勾图标 ✅
```

## 如果24小时后仍无效

1. **联系Vercel支持**:
   - 邮箱: support@vercel.com
   - 提供: 域名、项目名、错误截图

2. **检查域名注册商**:
   - 确保DNS记录正确
   - 没有防火墙或安全设置阻止

3. **临时解决方案**:
   - 使用Vercel原始域名: https://modern-home-storage-vercel.vercel.app
   - 设置重定向从www域名到Vercel域名

## 成功标志
- ✅ 访问 https://www.hiskiwuu.com 显示绿色锁图标
- ✅ 网站内容正常显示
- ✅ Vercel域名页面显示绿色勾
- ✅ SSL检查工具显示A评级