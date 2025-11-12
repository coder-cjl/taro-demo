# HTTP 网络框架使用文档

## 📦 已完成的 Taro 小程序适配

### ✅ 主要改动

1. **移除 axios 依赖** → 使用 `Taro.request`
2. **移除 localStorage** → 使用 `Taro.getStorageSync` / `Taro.removeStorageSync`
3. **移除 import.meta.env** → 使用 `process.env.TARO_ENV` 判断环境
4. **保持所有功能不变** → API 调用方式完全一致

### 🎯 功能特性

- ✅ 请求/响应拦截器
- ✅ 自动 Token 管理
- ✅ 请求重试机制
- ✅ Loading 自动管理
- ✅ 错误统一处理
- ✅ 业务状态码处理
- ✅ TypeScript 类型支持

---

## 🚀 快速开始

### 1️⃣ 基础用法

```typescript
import { apiGet, apiPost } from 'src/https/request'

// GET 请求
const getUserInfo = async (userId: string) => {
  const result = await apiGet<UserInfo>('/user/info', { userId })
  if (result.isSuccess) {
    console.log('用户信息:', result.data)
  }
}

// POST 请求
const login = async (username: string, password: string) => {
  const result = await apiPost<LoginResponse>('/auth/login', {
    username,
    password,
  })

  if (result.isSuccess) {
    // 保存 token
    Taro.setStorageSync('authToken', result.data.token)
  }
}
```

### 2️⃣ 配置选项

```typescript
import { apiGet } from 'src/https/request'

const fetchData = async () => {
  const result = await apiGet(
    '/api/data',
    {},
    {
      showLoading: true, // 显示 loading
      showError: true, // 显示错误提示
      needToken: true, // 需要 token（默认 true）
      retry: 3, // 失败重试 3 次
      retryDelay: 1000, // 重试延迟 1 秒
      timeout: 15000, // 超时时间 15 秒

      // 自定义错误处理
      customErrorHandler: error => {
        console.error('自定义错误处理:', error)
      },
    }
  )
}
```

### 3️⃣ 在页面中使用

```typescript
// pages/user/logic.ts
import { apiGet, apiPost } from 'src/https/request'

interface UserInfo {
  id: number
  name: string
  avatar: string
}

export default function useUserLogic() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)

  // 获取用户信息
  const fetchUserInfo = async () => {
    try {
      const result = await apiGet<UserInfo>(
        '/user/info',
        {},
        {
          showLoading: true,
        }
      )

      if (result.isSuccess) {
        setUserInfo(result.data)
      }
    } catch (error) {
      console.error('获取用户信息失败:', error)
    }
  }

  // 更新用户信息
  const updateUserInfo = async (data: Partial<UserInfo>) => {
    const result = await apiPost('/user/update', data, {
      showLoading: true,
    })

    if (result.isSuccess) {
      showSuccess('更新成功')
      fetchUserInfo() // 重新获取
    }
  }

  return {
    userInfo,
    fetchUserInfo,
    updateUserInfo,
  }
}
```

---

## 🔧 配置说明

### 环境变量配置

在 `http.ts` 中修改 API 基础地址：

```typescript
// src/https/http.ts 第 18 行
function getFullUrl(url: string): string {
  const baseURL =
    process.env.TARO_ENV === 'weapp'
      ? 'https://your-api-domain.com/api' // 👈 修改为你的小程序 API 地址
      : '/api' // H5 环境

  return `${baseURL}${url.startsWith('/') ? url : '/' + url}`
}
```

### Token 存储

框架会自动从 `authToken` 中读取 token：

```typescript
// 登录后保存 token
Taro.setStorageSync('authToken', 'your-token-here')

// 退出登录清除 token
Taro.removeStorageSync('authToken')
```

---

## 📋 API 参考

### RequestConfig 配置项

| 参数                 | 类型                                   | 默认值                                   | 说明             |
| -------------------- | -------------------------------------- | ---------------------------------------- | ---------------- |
| `url`                | `string`                               | -                                        | 请求地址         |
| `method`             | `'GET' \| 'POST' \| 'PUT' \| 'DELETE'` | `'GET'`                                  | 请求方法         |
| `params`             | `Record<string, any>`                  | -                                        | GET 请求参数     |
| `data`               | `any`                                  | -                                        | POST/PUT 请求体  |
| `header`             | `Record<string, string>`               | `{ 'Content-Type': 'application/json' }` | 请求头           |
| `timeout`            | `number`                               | `10000`                                  | 超时时间（毫秒） |
| `showLoading`        | `boolean`                              | `false`                                  | 是否显示 loading |
| `showError`          | `boolean`                              | `true`                                   | 是否显示错误提示 |
| `needToken`          | `boolean`                              | `true`                                   | 是否需要 token   |
| `retry`              | `number`                               | `0`                                      | 重试次数         |
| `retryDelay`         | `number`                               | `1000`                                   | 重试延迟（毫秒） |
| `customErrorHandler` | `(error: Error) => void`               | -                                        | 自定义错误处理   |

### ApiResponse 响应结构

```typescript
interface ApiResponse<T> {
  isSuccess: boolean // 请求是否成功
  data: T | null // 响应数据
  message: string // 提示信息
  code?: number // 状态码
}
```

---

## ⚠️ 注意事项

### 1. 小程序域名配置

确保在微信小程序后台配置了服务器域名（request 合法域名）

### 2. 后端响应格式

后端需要返回统一的响应格式：

```json
{
  "code": 200,
  "message": "操作成功",
  "data": { ... }
}
```

### 3. 错误处理

- HTTP 状态码错误（401, 403, 500 等）会自动处理
- 业务状态码错误（code !== 200）会自动提示
- 可以通过 `customErrorHandler` 自定义错误处理

### 4. Token 刷新

如果需要 token 刷新功能，可以在响应拦截器中添加：

```typescript
// 在 http.ts 的 afterResponse 方法中
if (apiResponse.code === 401) {
  // 尝试刷新 token
  const newToken = await refreshToken()
  if (newToken) {
    // 重试原请求
    return this.request(config)
  }
}
```

---

## 🎯 完整示例

```typescript
// api/user.ts - API 定义
import { apiGet, apiPost, apiPut, apiDelete } from 'src/https/request'

export const userApi = {
  // 获取用户信息
  getInfo: (userId: string) => apiGet<UserInfo>('/user/info', { userId }),

  // 更新用户信息
  updateInfo: (data: Partial<UserInfo>) => apiPost('/user/update', data, { showLoading: true }),

  // 获取用户列表
  getList: (page: number, pageSize: number) => apiGet<UserList>('/user/list', { page, pageSize }),

  // 删除用户
  delete: (userId: string) => apiDelete('/user/delete', { userId }),
}

// pages/user/logic.ts - 使用
import { userApi } from 'src/api/user'

export default function useUserLogic() {
  const loadUserInfo = async () => {
    const result = await userApi.getInfo('123')
    if (result.isSuccess) {
      console.log(result.data)
    }
  }

  return { loadUserInfo }
}
```

---

## 🔄 从 Axios 迁移指南

### 之前（Web 版本）

```typescript
import axios from 'axios'

const response = await axios.get('/api/user', { params: { id: '123' } })
const data = response.data
```

### 现在（Taro 版本）

```typescript
import { apiGet } from 'src/https/request'

const result = await apiGet('/user', { id: '123' })
if (result.isSuccess) {
  const data = result.data
}
```

### 主要区别

1. 使用 `apiGet/apiPost` 替代 `axios.get/post`
2. 响应结构变为 `ApiResponse<T>`
3. 通过 `isSuccess` 判断请求是否成功
4. 数据在 `result.data` 中获取

---

## 📞 支持

如有问题，请查看源码注释或联系开发团队。
