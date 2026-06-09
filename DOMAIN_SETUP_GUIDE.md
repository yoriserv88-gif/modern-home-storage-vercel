# Vercel自定义域名绑定指南

## 当前Vercel项目
- 项目名称: modern-home-storage-vercel
- Vercel URL: https://modern-home-storage-vercel.vercel.app
- 状态: 已部署成功

## 域名绑定步骤

### 第1步：登录Vercel配置域名
1. 访问: https://vercel.com/dashboard
2. 点击项目: `modern-home-storage-vercel`
3. 点击"Settings" → "Domains"
4. 在"Add Domain"输入您的域名（如: `yourdomain.com`）
5. 点击"Add"

### 第2步：获取DNS配置信息
Vercel会显示需要添加的DNS记录，通常为：

#### 选项A：绑定根域名 + www子域名（推荐）
```
记录1 (A记录):
类型: A
名称: @ (或留空)
值: 76.76.21.21
TTL: 自动

记录2 (CNAME记录):
类型: CNAME  
名称: www
值: cname.vercel-dns.com
TTL: 自动
```

#### 选项B：只绑定www子域名
```
类型: CNAME
名称: www
值: cname.vercel-dns.com
TTL: 自动
```

### 第3步：在域名注册商处配置DNS

#### GoDaddy 配置步骤：
1. 登录 https://dcc.godaddy.com/
2. 点击"My Products" → "Domains"
3. 找到您的域名 → 点击"DNS"
4. 点击"Add"添加新记录
5. 按照Vercel提供的记录填写
6. 点击"Save"

#### Namecheap 配置步骤：
1. 登录 https://www.namecheap.com/
2. 点击"Dashboard" → "Domain List"
3. 点击"Manage" → "Advanced DNS"
4. 点击"Add New Record"
5. 按照Vercel提供的记录填写
6. 点击"Save All Changes"

#### 阿里云 配置步骤：
1. 登录 https://homenew.console.aliyun.com/
2. 进入"域名与网站" → "域名"
3. 找到域名 → 点击"解析设置"
4. 点击"添加记录"
5. 按照Vercel提供的记录填写
6. 点击"确认"

#### 腾讯云 配置步骤：
1. 登录 https://console.cloud.tencent.com/
2. 进入"域名注册" → "我的域名"
3. 点击域名 → "解析"
4. 点击"添加记录"
5. 按照Vercel提供的记录填写
6. 点击"保存"

### 第4步：等待DNS传播
- 即时检查: 5-10分钟后
- 部分地区生效: 1-2小时
- 全球生效: 24-48小时

### 第5步：验证配置
1. **检查DNS传播**:
   - https://dnschecker.org/
   - https://www.whatsmydns.net/
   输入您的域名，检查A记录或CNAME记录是否正确

2. **检查Vercel状态**:
   - 回到Vercel "Domains"页面
   - 查看域名状态图标
   - ✅ 绿色: 成功
   - ⏳ 时钟: 等待中
   - ❌ 红色: 错误

3. **测试访问**:
   - 访问: http://您的域名
   - 访问: http://www.您的域名
   - 应该显示您的网站

## 常见问题解决

### 问题1：DNS配置错误
**症状**: Vercel显示红色错误图标
**解决**:
1. 检查DNS记录值是否正确
2. 确保没有重复记录
3. 删除错误记录，重新添加

### 问题2：SSL证书问题
**症状**: HTTPS显示不安全
**解决**:
1. Vercel会自动为自定义域名配置SSL证书
2. 等待证书颁发（通常几分钟到几小时）
3. 如果24小时后仍无证书，联系Vercel支持

### 问题3：只能访问www，不能访问根域名
**解决**:
1. 确保同时配置了A记录（@ → 76.76.21.21）
2. 或配置URL重定向：根域名重定向到www

### 问题4：DNS传播太慢
**解决**:
1. 清除本地DNS缓存:
   - Windows: `ipconfig /flushdns`
   - Mac: `sudo killall -HUP mDNSResponder`
2. 使用其他网络测试
3. 耐心等待24-48小时

## 最佳实践

### 1. 同时绑定根域名和www
```
根域名: yourdomain.com → A记录 → 76.76.21.21
www: www.yourdomain.com → CNAME → cname.vercel-dns.com
```

### 2. 设置重定向（可选）
在Vercel中设置:
- `yourdomain.com` 重定向到 `www.yourdomain.com`
- 或反之，保持一致性

### 3. 启用HTTPS强制跳转
Vercel默认启用，确保所有流量使用HTTPS

### 4. 监控域名状态
定期检查Vercel的"Domains"页面，确保状态正常

## 技术支持
如果遇到问题:
1. 检查Vercel文档: https://vercel.com/docs/projects/domains
2. 查看域名注册商帮助文档
3. 联系Vercel支持: support@vercel.com

## 完成后的效果
- 访问: https://yourdomain.com → 显示您的网站
- 访问: https://www.yourdomain.com → 显示您的网站
- 自动HTTPS，安全连接
- Vercel自动处理CDN和缓存