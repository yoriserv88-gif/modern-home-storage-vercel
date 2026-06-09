# 修复 Admin Dashboard 中的 404 错误

## 问题描述
在 `http://localhost:3000/admin/dashboard` 页面中，Website Modules 模块下的 Manage 按钮点击后出现 404 错误：
- Hero Banner → 404
- Products Gallery → 404  
- Factory Images → 404
- Partner Logos → 404

## 根本原因
Dashboard 页面中的链接指向不存在的路由：
```javascript
// 修复前 - 这些路径都不存在
const websiteModules = [
  { name: 'Hero Banner', path: '/admin/images/hero', ... },
  { name: 'Products Gallery', path: '/admin/images/products', ... },
  { name: 'Factory Images', path: '/admin/images/factory', ... },
  { name: 'Partner Logos', path: '/admin/images/partners', ... },
]
```

## 解决方案
修改链接指向现有的 `/admin/images/manage` 页面，并通过 URL 参数传递模块信息：

### 1. 修改 Dashboard 页面 (`app/admin/dashboard/page.tsx`)
```javascript
// 修复后 - 指向现有的管理页面并传递模块参数
const websiteModules = [
  { name: 'Hero Banner', path: '/admin/images/manage?module=Hero Banner', ... },
  { name: 'Products Gallery', path: '/admin/images/manage?module=Products', ... },
  { name: 'Factory Images', path: '/admin/images/manage?module=Factory', ... },
  { name: 'Partner Logos', path: '/admin/images/manage?module=Partners', ... },
]
```

### 2. 增强管理页面 (`app/admin/images/manage/page.tsx`)
- 添加 `useSearchParams` 来读取 URL 参数
- 添加 `useEffect` 根据 URL 参数自动设置模块过滤
- 更新页面标题显示当前模块
- 添加"清除过滤"链接

## 已修复的功能

### 点击流程：
1. **Dashboard** → 点击 "Hero Banner" 的 Manage 按钮
2. **跳转到** → `/admin/images/manage?module=Hero Banner`
3. **自动过滤** → 页面自动显示 Hero Banner 模块的图片
4. **标题更新** → 显示 "Manage Images - Hero Banner"
5. **清除过滤** → 点击 "Clear filter" 返回所有图片

### 支持的模块参数：
- `?module=Hero Banner` - 英雄横幅图片
- `?module=Products` - 产品图库  
- `?module=Factory` - 工厂图片
- `?module=Partners` - 合作伙伴logo

## 修复的文件

1. **`app/admin/dashboard/page.tsx`**
   - 修改了 `websiteModules` 数组中的路径
   - 从 `/admin/images/hero` 改为 `/admin/images/manage?module=Hero Banner`

2. **`app/admin/images/manage/page.tsx`**
   - 添加了 `useSearchParams` 导入
   - 添加了 `useEffect` 读取 URL 参数
   - 更新了页面标题显示当前模块
   - 添加了清除过滤的链接

## 验证修复

### 测试步骤：
1. 访问 `http://localhost:3000/admin/dashboard`
2. 使用管理员凭证登录（默认：admin@example.com / admin123）
3. 在 Website Modules 部分，点击每个模块的 "Manage" 按钮
4. 确认：
   - 不再出现 404 错误
   - 页面正确加载并显示相应模块的图片
   - 页面标题显示正确的模块名称
   - 可以点击 "Clear filter" 返回所有图片

### 预期结果：
- ✅ Hero Banner Manage → 显示 Hero Banner 图片
- ✅ Products Gallery Manage → 显示 Products 图片  
- ✅ Factory Images Manage → 显示 Factory 图片
- ✅ Partner Logos Manage → 显示 Partners 图片

## 技术细节

### URL 参数处理：
```typescript
// 在 manage/page.tsx 中添加
const searchParams = useSearchParams()

useEffect(() => {
  const moduleParam = searchParams.get('module')
  if (moduleParam && modules.includes(moduleParam)) {
    setFilterModule(moduleParam) // 自动设置过滤
  }
}, [searchParams])
```

### 条件渲染标题：
```typescript
<h1 className="text-3xl font-bold text-gray-900 mb-2">
  Manage Images {filterModule !== 'all' && `- ${filterModule}`}
</h1>
```

## 备用方案考虑

如果未来需要单独的页面，可以：
1. 创建 `/app/admin/images/hero/page.tsx` 等页面
2. 在这些页面中重定向到管理页面
3. 或复制管理页面的代码并定制化

但当前方案更优：
- ✅ 代码复用（一个页面处理所有模块）
- ✅ 维护简单（只需维护一个文件）
- ✅ 用户体验一致（统一的界面和功能）
- ✅ URL 友好（清晰的参数语义）

## 后续改进建议

1. **面包屑导航**：在管理页面添加更详细的面包屑
2. **模块统计**：在 Dashboard 显示每个模块的实时图片数量
3. **批量操作**：添加按模块批量上传/删除功能
4. **图片预览**：添加更大尺寸的图片预览

## 注意事项

1. **模块名称一致性**：确保 Dashboard 中的模块名称与管理页面中的过滤选项完全一致
2. **URL 编码**：如果模块名称包含空格或特殊字符，可能需要 URL 编码
3. **错误处理**：如果传递了无效的模块参数，应优雅地处理（当前会显示"All Modules"）

---
**修复完成时间**: 2026年6月9日  
**修复状态**: ✅ 已修复  
**影响范围**: Admin Dashboard 的 Website Modules 功能  
**测试建议**: 手动测试所有4个模块的链接  
