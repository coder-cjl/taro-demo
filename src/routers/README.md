# Taro 路由导航工具使用文档

## 📦 导入

```tsx
import { useNavigateRouter } from 'src/routers/navigate'
```

## 🚀 使用方法

### 在组件中使用

```tsx
export default function MyPage() {
  const router = useNavigateRouter()
  
  const handleClick = () => {
    router.toName('/pages/detail/index', { id: '123' })
  }
  
  return (
    <View>
      <Button onClick={handleClick}>跳转到详情</Button>
      <Button onClick={() => router.back()}>返回</Button>
    </View>
  )
}
```

---

## 📖 API 文档

### 1. back() - 返回上一页

```tsx
// 返回上一页
router.back()

// 返回多级（返回 2 级）
router.back(2)
```

**参数**：
- `delta?: number` - 返回的页面数，默认为 1

**说明**：
- 相当于 `Taro.navigateBack()`
- 如果 delta 大于现有页面数，则返回到首页

---

### 2. toName() - 跳转页面

```tsx
// 基础跳转
router.toName('/pages/detail/index')

// 带参数跳转
router.toName('/pages/detail/index', { 
  id: '123', 
  name: '商品名称' 
})
```

**参数**：
- `path: string` - 页面路径（必填）
- `params?: Record<string, any>` - 查询参数（可选）

**说明**：
- 保留当前页面，跳转到应用内的某个页面
- 相当于 `Taro.navigateTo()`
- 小程序页面栈最多 10 层

---

### 3. replaceTo() - 重定向

```tsx
// 基础重定向
router.replaceTo('/pages/home/index')

// 带参数重定向
router.replaceTo('/pages/login/index', { 
  redirect: '/pages/profile/index' 
})
```

**参数**：
- `path: string` - 页面路径（必填）
- `params?: Record<string, any>` - 查询参数（可选）

**说明**：
- 关闭当前页面，跳转到应用内的某个页面
- 相当于 `Taro.redirectTo()`
- 不会增加页面栈层数

---

### 4. toTab() - 跳转 TabBar

```tsx
// 跳转到 TabBar 页面
router.toTab('/pages/home/index')
```

**参数**：
- `path: string` - TabBar 页面路径（必填）

**说明**：
- 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
- 相当于 `Taro.switchTab()`
- 路径必须是 app.config.ts 中定义的 tabBar 页面

---

### 5. reLaunch() - 重新启动

```tsx
// 重新启动到首页
router.reLaunch('/pages/home/index')

// 带参数重启
router.reLaunch('/pages/error/index', { 
  code: '404', 
  message: '页面不存在' 
})
```

**参数**：
- `path: string` - 页面路径（必填）
- `params?: Record<string, any>` - 查询参数（可选）

**说明**：
- 关闭所有页面，打开到应用内的某个页面
- 相当于 `Taro.reLaunch()`
- 会清空页面栈

---

### 6. getQueryParam() - 获取单个参数

```tsx
// 在目标页面中获取参数
const id = router.getQueryParam('id')
const name = router.getQueryParam('name', '默认名称')
```

**参数**：
- `key: string` - 参数名（必填）
- `defaultValue?: string` - 默认值（可选）

**返回**：
- `string | null` - 参数值或 null

**说明**：
- 获取 URL 查询参数
- 如果参数不存在且没有提供默认值，返回 null

---

### 7. getAllParams() - 获取所有参数

```tsx
// 获取所有查询参数
const params = router.getAllParams()
console.log(params) // { id: '123', name: '商品名称' }
```

**返回**：
- `Record<string, any>` - 所有参数对象

**说明**：
- 返回当前页面的所有查询参数
- 返回值是一个对象

---

### 8. getCurrentPath() - 获取当前路径

```tsx
const currentPath = router.getCurrentPath()
console.log(currentPath) // 'pages/detail/index'
```

**返回**：
- `string` - 当前页面路径

**说明**：
- 返回当前页面的完整路径
- 不包含查询参数

---

### 9. preload() - 预加载数据

```tsx
// 在跳转前预加载数据
router.preload({ 
  userData: { name: '张三', age: 25 },
  productList: [...]
})

router.toName('/pages/detail/index')
```

**参数**：
- `data: Record<string, any>` - 要预加载的数据对象

**说明**：
- 用于页面跳转前预加载数据
- 可以在目标页面通过 `getPreloadData()` 获取

---

### 10. getPreloadData() - 获取预加载数据

```tsx
// 在目标页面获取预加载的数据
const userData = router.getPreloadData('userData')
console.log(userData) // { name: '张三', age: 25 }

// 获取所有预加载数据
const allData = router.getPreloadData()
console.log(allData) // { userData: {...}, productList: [...] }
```

**参数**：
- `key?: string` - 数据键名（可选）

**返回**：
- `any` - 预加载的数据

**说明**：
- 如果提供 key，返回对应的数据
- 如果不提供 key，返回所有预加载数据

---

## 🎯 实战案例

### 案例1：列表跳转详情

```tsx
// 列表页
export default function ProductList() {
  const router = useNavigateRouter()
  
  const handleItemClick = (product) => {
    router.toName('/pages/product/detail', { 
      id: product.id 
    })
  }
  
  return (
    <View>
      {products.map(item => (
        <View key={item.id} onClick={() => handleItemClick(item)}>
          {item.name}
        </View>
      ))}
    </View>
  )
}

// 详情页
export default function ProductDetail() {
  const router = useNavigateRouter()
  const productId = router.getQueryParam('id')
  
  useEffect(() => {
    // 根据 id 加载产品详情
    loadProduct(productId)
  }, [productId])
  
  return <View>产品详情</View>
}
```

### 案例2：登录后重定向

```tsx
export default function Login() {
  const router = useNavigateRouter()
  const redirect = router.getQueryParam('redirect', '/pages/home/index')
  
  const handleLogin = async () => {
    await loginApi()
    // 登录成功后跳转到之前的页面
    router.replaceTo(redirect)
  }
  
  return (
    <View>
      <Input placeholder="用户名" />
      <Button onClick={handleLogin}>登录</Button>
    </View>
  )
}
```

### 案例3：TabBar 切换

```tsx
export default function Settings() {
  const router = useNavigateRouter()
  
  const handleBackToHome = () => {
    router.toTab('/pages/home/index')
  }
  
  return (
    <View>
      <Button onClick={handleBackToHome}>返回首页</Button>
    </View>
  )
}
```

### 案例4：传递复杂数据

```tsx
// 列表页 - 使用 preload 传递复杂对象
export default function ProductList() {
  const router = useNavigateRouter()
  
  const handleItemClick = (product) => {
    // 预加载产品数据
    router.preload({ 
      product: product,
      fromPage: 'list'
    })
    router.toName('/pages/product/detail', { id: product.id })
  }
  
  return <View>...</View>
}

// 详情页 - 获取预加载数据
export default function ProductDetail() {
  const router = useNavigateRouter()
  const product = router.getPreloadData('product')
  const fromPage = router.getPreloadData('fromPage')
  
  return (
    <View>
      <Text>{product?.name}</Text>
      <Text>来自: {fromPage}</Text>
    </View>
  )
}
```

### 案例5：错误处理

```tsx
export default function MyPage() {
  const router = useNavigateRouter()
  
  const handleError = (error) => {
    router.reLaunch('/pages/error/index', {
      code: error.code,
      message: error.message
    })
  }
  
  return <View>...</View>
}
```

---

## 💡 最佳实践

### 1. 路径规范
```tsx
// ✅ 使用绝对路径
router.toName('/pages/detail/index')

// ❌ 不要使用相对路径
router.toName('../detail/index')
```

### 2. 参数传递
```tsx
// ✅ 简单数据用查询参数
router.toName('/pages/detail/index', { id: '123' })

// ✅ 复杂数据用 preload
router.preload({ userData: {...}, list: [...] })
router.toName('/pages/detail/index')
```

### 3. 返回逻辑
```tsx
// ✅ 简单返回
router.back()

// ✅ TabBar 页面切换
router.toTab('/pages/home/index')

// ❌ 不要对 TabBar 页面使用 back()
// 因为可能导致页面栈混乱
```

### 4. 重定向场景
```tsx
// ✅ 登录跳转使用 replaceTo
router.replaceTo('/pages/home/index')

// ✅ 错误页面使用 reLaunch
router.reLaunch('/pages/error/index')
```

---

## ⚠️ 注意事项

1. **页面栈限制**：小程序页面栈最多 10 层，超过后无法继续 `toName()`
2. **TabBar 限制**：`toTab()` 只能跳转到 app.config.ts 中定义的 tabBar 页面
3. **参数编码**：所有参数会自动进行 URL 编码
4. **参数类型**：查询参数只能是字符串，复杂对象请使用 `preload()`
5. **生命周期**：在组件卸载后调用路由方法可能会报错，注意清理

---

## 🔄 与原生 Taro API 对照

| useNavigateRouter | Taro 原生 API | 说明 |
|-------------------|--------------|------|
| `back()` | `Taro.navigateBack()` | 返回上一页 |
| `toName()` | `Taro.navigateTo()` | 跳转新页面 |
| `replaceTo()` | `Taro.redirectTo()` | 重定向 |
| `toTab()` | `Taro.switchTab()` | 跳转 TabBar |
| `reLaunch()` | `Taro.reLaunch()` | 重新启动 |
| `getQueryParam()` | `getCurrentInstance().router.params` | 获取参数 |

---

**版本**: v1.0.0  
**更新日期**: 2025-11-07  
**兼容**: Taro 3.x
