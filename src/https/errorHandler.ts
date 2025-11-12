import Taro from '@tarojs/taro'
import type { ApiResponse, RequestConfig } from './types'
import { showError } from 'src/components/luca-ui'
import { useNavigateRouter } from 'src/routers/navigate'

/**
 * HTTP 错误信息
 */
interface HttpErrorInfo {
  statusCode: number
  data?: any
  config?: RequestConfig
  errMsg?: string
}

/**
 * HTTP 状态码错误信息映射
 */
const HTTP_ERROR_MESSAGES: Record<number, string> = {
  400: '请求参数错误',
  401: '未授权，请重新登录',
  403: '拒绝访问',
  404: '请求的资源不存在',
  405: '请求方法不允许',
  408: '请求超时',
  500: '服务器内部错误',
  501: '服务未实现',
  502: '网关错误',
  503: '服务不可用',
  504: '网关超时',
  505: 'HTTP版本不受支持',
}

/**
 * 业务错误码处理
 */
const BUSINESS_ERROR_HANDLERS: Record<number, (message: string) => void> = {
  // 未登录或 token 过期
  401: (message: string) => {
    showError(message || '未授权，请重新登录')
    // 清除 token
    Taro.removeStorageSync('authToken')
    // 跳转到登录页
    setTimeout(() => {
      useNavigateRouter().reLaunch('/pages/login/index')
    }, 1500)
  },
  // 无权限
  403: (message: string) => {
    showError(message || '无权限访问该资源')
  },
  // 服务器错误
  500: (message: string) => {
    showError(message || '服务器错误，请稍后重试')
  },
}

/**
 * 处理 HTTP 错误
 */
export function handleHttpError(errorInfo: HttpErrorInfo): ApiResponse {
  const { statusCode, data, errMsg } = errorInfo

  if (statusCode > 0) {
    // 服务器返回了错误状态码
    const errorData = data as ApiResponse

    const message =
      errorData?.message || HTTP_ERROR_MESSAGES[statusCode] || `请求失败 (${statusCode})`

    // 执行特定状态码的处理
    const handler = BUSINESS_ERROR_HANDLERS[statusCode]
    if (handler) {
      handler(message)
    } else {
      showError(message)
    }

    return {
      isSuccess: false,
      data: null,
      message,
      code: statusCode,
    }
  } else {
    // 网络错误或其他错误
    let message = '网络连接失败，请检查网络'

    if (errMsg) {
      if (errMsg.includes('timeout')) {
        message = '请求超时，请稍后重试'
      } else if (errMsg.includes('fail')) {
        message = '网络请求失败'
      }
    }

    showError(message)
    return {
      isSuccess: false,
      data: null,
      message,
      code: -1,
    }
  }
}

/**
 * 处理业务错误（后端返回的错误码）
 */
export function handleBusinessError(code: number, message: string): ApiResponse {
  // 执行特定业务码的处理
  const handler = BUSINESS_ERROR_HANDLERS[code]
  if (handler) {
    handler(message)
  } else {
    showError(message)
  }

  return {
    isSuccess: false,
    data: null,
    message,
    code,
  }
}
