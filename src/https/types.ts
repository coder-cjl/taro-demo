/**
 * 标准化的响应结构
 */
export interface ApiResponse<T = unknown> {
  isSuccess: boolean
  data: T | null
  message: string
  code?: number
}

/**
 * HTTP 请求方法
 */
export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS'

/**
 * HTTP 请求配置（基于 Taro.request）
 */
export interface RequestConfig {
  // 请求 URL
  url?: string
  // 请求方法
  method?: RequestMethod
  // 请求参数（GET）
  params?: Record<string, any>
  // 请求数据（POST/PUT）
  data?: any
  // 请求头
  header?: Record<string, string>
  // 超时时间
  timeout?: number
  // 数据类型
  dataType?: 'json' | 'text' | 'html'
  // 响应类型
  responseType?: 'text' | 'arraybuffer'

  // 自定义配置
  // 是否显示 loading
  showLoading?: boolean
  // 是否显示错误提示
  showError?: boolean
  // 自定义错误处理
  customErrorHandler?: (error: Error) => void
  // 是否需要 token
  needToken?: boolean
  // 重试次数
  retry?: number
  // 重试延迟（毫秒）
  retryDelay?: number
  // 内部使用：当前重试计数
  __retryCount?: number
}

/**
 * Taro 请求响应（扩展）
 */
export interface TaroResponse<T = any> {
  data: T
  statusCode: number
  header: Record<string, any>
  cookies?: string[]
  config?: RequestConfig
}
