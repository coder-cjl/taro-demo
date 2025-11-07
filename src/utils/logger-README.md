# Logger 日志工具使用文档

## 📦 导入

```typescript
import { logger } from 'src/utils/log'
// 或
import logger from 'src/utils/log'
```

---

## 🚀 基础使用

### 1. 普通日志

```typescript
// Debug 日志 - 仅在开发环境显示
logger.debug('调试信息', { userId: 123 })

// Info 日志
logger.info('用户登录成功', username)

// Warning 日志
logger.warn('API 响应较慢', responseTime)

// Error 日志
logger.error('请求失败', error)
```

### 2. 日志格式

所有日志都会自动添加格式化的前缀：

```
[14:30:25][INFO] 用户登录成功 张三
[14:30:26][ERROR] 请求失败 Error: Network timeout
```

---

## 🎯 高级功能

### 1. 自定义日志

可以自定义日志的显示选项：

```typescript
logger.custom('info', {
  showTime: true,      // 显示时间
  showLevel: true,     // 显示级别
  prefix: 'API'        // 自定义前缀
}, '请求成功', data)

// 输出: [API][14:30:25][INFO] 请求成功 {...}
```

### 2. 分组日志

用于组织相关的日志信息：

```typescript
logger.group('用户信息', () => {
  logger.info('姓名:', user.name)
  logger.info('年龄:', user.age)
  logger.info('邮箱:', user.email)
})

// 输出:
// ▼ 用户信息
//   [14:30:25][INFO] 姓名: 张三
//   [14:30:25][INFO] 年龄: 25
//   [14:30:25][INFO] 邮箱: zhang@example.com
```

### 3. 表格日志

以表格形式展示数组或对象数据：

```typescript
const users = [
  { id: 1, name: '张三', age: 25 },
  { id: 2, name: '李四', age: 30 },
  { id: 3, name: '王五', age: 28 }
]

logger.table(users)

// 输出表格:
// ┌─────────┬────┬────────┬─────┐
// │ (index) │ id │  name  │ age │
// ├─────────┼────┼────────┼─────┤
// │    0    │ 1  │ '张三' │ 25  │
// │    1    │ 2  │ '李四' │ 30  │
// │    2    │ 3  │ '王五' │ 28  │
// └─────────┴────┴────────┴─────┘
```

### 4. 性能计时

测量代码执行时间：

```typescript
// 开始计时
logger.timeStart('数据加载')

// 执行耗时操作
await fetchData()

// 结束计时
logger.timeEnd('数据加载')

// 输出: 数据加载: 1234.567ms
```

---

## 📖 API 文档

### logger.debug()
**用途**: 调试日志，仅在开发环境输出  
**参数**: `...args: unknown[]`  
**示例**:
```typescript
logger.debug('调试信息', variable, object)
```

### logger.info()
**用途**: 普通信息日志  
**参数**: `...args: unknown[]`  
**示例**:
```typescript
logger.info('操作成功', result)
```

### logger.warn()
**用途**: 警告日志  
**参数**: `...args: unknown[]`  
**示例**:
```typescript
logger.warn('数据可能不准确', data)
```

### logger.error()
**用途**: 错误日志  
**参数**: `...args: unknown[]`  
**示例**:
```typescript
logger.error('请求失败', error)
```

### logger.custom()
**用途**: 自定义选项的日志  
**参数**: 
- `level: LogLevel` - 日志级别
- `options: LogOptions` - 日志选项
  - `showTime?: boolean` - 是否显示时间
  - `showLevel?: boolean` - 是否显示级别
  - `prefix?: string` - 自定义前缀
- `...args: unknown[]` - 日志内容

**示例**:
```typescript
logger.custom('info', { prefix: 'API' }, '请求成功')
```

### logger.group()
**用途**: 分组日志  
**参数**:
- `label: string` - 分组标签
- `callback: () => void` - 分组内的日志回调

**示例**:
```typescript
logger.group('数据详情', () => {
  logger.info('字段1', value1)
  logger.info('字段2', value2)
})
```

### logger.table()
**用途**: 表格日志  
**参数**: `data: any` - 数据对象或数组  
**示例**:
```typescript
logger.table([{ id: 1, name: '张三' }])
```

### logger.timeStart()
**用途**: 开始计时  
**参数**: `label: string` - 计时标签  
**示例**:
```typescript
logger.timeStart('操作耗时')
```

### logger.timeEnd()
**用途**: 结束计时  
**参数**: `label: string` - 计时标签（需与 timeStart 一致）  
**示例**:
```typescript
logger.timeEnd('操作耗时')
```

---

## 🎨 实战案例

### 案例1: API 请求日志

```typescript
async function fetchUserData(userId: string) {
  logger.timeStart('用户数据加载')
  
  try {
    logger.info('开始请求用户数据', { userId })
    
    const response = await api.getUser(userId)
    
    logger.info('用户数据加载成功', response.data)
    logger.table([response.data])
    
    return response.data
  } catch (error) {
    logger.error('用户数据加载失败', error)
    throw error
  } finally {
    logger.timeEnd('用户数据加载')
  }
}
```

### 案例2: 页面生命周期日志

```typescript
export default function MyPage() {
  useEffect(() => {
    logger.group('页面加载', () => {
      logger.info('页面路径:', router.getCurrentPath())
      logger.info('页面参数:', router.getAllParams())
      logger.debug('组件挂载完成')
    })
    
    return () => {
      logger.debug('组件卸载')
    }
  }, [])
  
  return <View>...</View>
}
```

### 案例3: 表单提交日志

```typescript
async function handleSubmit(formData) {
  logger.group('表单提交', () => {
    logger.info('表单数据:', formData)
    logger.table(formData)
  })
  
  try {
    logger.timeStart('表单提交')
    const result = await submitForm(formData)
    logger.info('提交成功', result)
    logger.timeEnd('表单提交')
  } catch (error) {
    logger.error('提交失败', error)
  }
}
```

### 案例4: 状态变化追踪

```typescript
const [count, setCount] = useState(0)

useEffect(() => {
  logger.debug('Count 变化:', {
    from: count - 1,
    to: count,
    timestamp: new Date().toISOString()
  })
}, [count])
```

### 案例5: 自定义业务日志

```typescript
// 创建业务专用日志
const orderLogger = {
  create: (order) => {
    logger.custom('info', { prefix: 'ORDER' }, '创建订单', order)
  },
  update: (orderId, changes) => {
    logger.custom('info', { prefix: 'ORDER' }, '更新订单', { orderId, changes })
  },
  cancel: (orderId, reason) => {
    logger.custom('warn', { prefix: 'ORDER' }, '取消订单', { orderId, reason })
  }
}

// 使用
orderLogger.create({ id: '001', amount: 299 })
// 输出: [ORDER][14:30:25][INFO] 创建订单 {id: '001', amount: 299}
```

### 案例6: 错误边界日志

```typescript
class ErrorBoundary extends Component {
  componentDidCatch(error, errorInfo) {
    logger.group('组件错误', () => {
      logger.error('错误信息:', error.message)
      logger.error('错误堆栈:', error.stack)
      logger.error('组件堆栈:', errorInfo.componentStack)
    })
  }
  
  render() {
    return this.props.children
  }
}
```

---

## 💡 最佳实践

### 1. 日志级别使用规范

```typescript
// ✅ debug - 调试信息，仅开发环境
logger.debug('变量值:', variable)

// ✅ info - 重要流程信息
logger.info('用户登录成功', username)

// ✅ warn - 警告信息，不影响运行
logger.warn('缓存未命中，将从服务器获取')

// ✅ error - 错误信息，需要关注
logger.error('API 请求失败', error)
```

### 2. 敏感信息处理

```typescript
// ❌ 不要直接输出敏感信息
logger.info('用户数据', { password: '123456', idCard: '...' })

// ✅ 脱敏后再输出
logger.info('用户数据', {
  username: user.username,
  phone: user.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
})
```

### 3. 性能计时

```typescript
// ✅ 给计时添加有意义的标签
logger.timeStart('商品列表加载')
await loadProducts()
logger.timeEnd('商品列表加载')

// ✅ 嵌套计时
logger.timeStart('页面初始化')
logger.timeStart('数据加载')
await loadData()
logger.timeEnd('数据加载')
logger.timeStart('UI渲染')
renderUI()
logger.timeEnd('UI渲染')
logger.timeEnd('页面初始化')
```

### 4. 分组使用

```typescript
// ✅ 用分组组织相关日志
logger.group('订单详情', () => {
  logger.info('订单号:', order.id)
  logger.info('金额:', order.amount)
  logger.info('状态:', order.status)
  logger.table(order.items)
})
```

---

## ⚠️ 注意事项

1. **生产环境**: `debug` 日志在生产环境会被自动过滤
2. **性能影响**: 避免在循环中频繁调用日志
3. **内存泄漏**: 计时器使用后记得调用 `timeEnd()`
4. **日志数量**: 合理控制日志输出，避免刷屏
5. **异步日志**: 异步操作中注意日志的时序关系

---

## 🔧 环境判断

日志工具会根据 `process.env.NODE_ENV` 判断环境：

```typescript
// 开发环境
NODE_ENV=development  → 所有日志都会输出

// 生产环境
NODE_ENV=production   → debug 日志不会输出
```

---

## 📊 日志输出对比

| 方法 | 开发环境 | 生产环境 | 带时间戳 | 带级别 |
|------|---------|---------|---------|--------|
| `debug()` | ✅ | ❌ | ✅ | ✅ |
| `info()` | ✅ | ✅ | ✅ | ✅ |
| `warn()` | ✅ | ✅ | ✅ | ✅ |
| `error()` | ✅ | ✅ | ✅ | ✅ |
| `table()` | ✅ | ❌ | ❌ | ❌ |
| `timeStart/End()` | ✅ | ❌ | ❌ | ❌ |

---

**版本**: v2.0.0  
**更新日期**: 2025-11-07  
**兼容**: Taro 3.x + Node.js
