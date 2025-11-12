import Taro from '@tarojs/taro'
import type { ApiResponse, RequestConfig, TaroResponse } from './types'
import { handleHttpError, handleBusinessError } from './errorHandler'
import { startLoading, stopLoading } from 'src/components/luca-ui'
import logger from 'src/utils/log'

/**
 * 延迟函数
 */
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

/**
 * 获取完整 URL
 */
function getFullUrl(url: string): string {
  // 如果是完整 URL，直接返回
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }

  // 获取基础 URL
  const baseURL =
    process.env.TARO_ENV === 'weapp'
      ? 'https://your-api-domain.com/api' // 小程序环境
      : '/api' // H5 环境

  return `${baseURL}${url.startsWith('/') ? url : '/' + url}`
}

/**
 * 获取 Token
 */
function getToken(): string | null {
  try {
    return Taro.getStorageSync('authToken') || null
  } catch (error) {
    logger.error('获取 token 失败:', error)
    return null
  }
}

/**
 * HTTP 请求封装
 */
class HttpClient {
  private defaultConfig: Partial<RequestConfig> = {
    timeout: 10000,
    dataType: 'json',
    responseType: 'text',
    needToken: true,
    showLoading: false,
    showError: true,
  }

  /**
   * 请求拦截器
   */
  private beforeRequest(config: RequestConfig): RequestConfig {
    // 显示 loading
    if (config.showLoading) {
      startLoading()
    }

    // 添加 token
    if (config.needToken !== false) {
      const token = getToken()
      if (token) {
        config.header = {
          ...config.header,
          Authorization: `Bearer ${token}`,
        }
      }
    }

    // 添加时间戳防止缓存（仅 GET 请求）
    if (config.method === 'GET' && config.params) {
      config.params = {
        ...config.params,
        _t: Date.now(),
      }
    }

    return config
  }

  /**
   * 响应拦截器
   */
  private async afterResponse<T = any>(
    response: TaroResponse,
    config: RequestConfig
  ): Promise<ApiResponse<T>> {
    // 隐藏 loading
    if (config.showLoading) {
      stopLoading()
    }

    const { statusCode, data } = response

    // HTTP 状态码错误
    if (statusCode !== 200) {
      const errorResult = handleHttpError({
        statusCode,
        data,
        config,
      })

      if (config.customErrorHandler) {
        config.customErrorHandler(new Error(errorResult.message))
      }

      return Promise.reject(errorResult)
    }

    if (!data || typeof data !== 'object') {
      return Promise.reject({
        isSuccess: false,
        data: null,
        message: '服务器返回数据格式错误',
        code: -1,
      })
    }

    // 业务状态码检查
    const apiResponse = data as ApiResponse
    if (apiResponse.code !== undefined && apiResponse.code !== 200) {
      const errorResult = handleBusinessError(apiResponse.code, apiResponse.message || '请求失败')

      if (config.customErrorHandler) {
        config.customErrorHandler(new Error(apiResponse.message))
      }

      return Promise.reject(errorResult)
    }

    // 成功响应
    return {
      isSuccess: true,
      data: apiResponse.data,
      message: apiResponse.message || '操作成功',
      code: apiResponse.code,
    } as ApiResponse<T>
  }

  /**
   * 重试请求
   */
  private async retryRequest<T = any>(config: RequestConfig, error: any): Promise<ApiResponse<T>> {
    const retryCount = config.retry || 0
    const retryDelay = config.retryDelay || 1000

    // 如果没有配置重试次数或已达到重试上限
    if (retryCount <= 0) {
      return Promise.reject(error)
    }

    // 初始化重试计数
    config.__retryCount = config.__retryCount || 0

    // 检查是否已达到最大重试次数
    if (config.__retryCount >= retryCount) {
      return Promise.reject(error)
    }

    // 增加重试计数
    config.__retryCount += 1

    logger.warn(`请求失败，正在进行第 ${config.__retryCount}/${retryCount} 次重试...`)

    // 延迟后重试
    await delay(retryDelay)

    // 重新发起请求
    return this.request(config)
  }

  /**
   * 核心请求方法
   */
  async request<T = any>(config: RequestConfig): Promise<ApiResponse<T>> {
    // 合并默认配置
    const finalConfig: RequestConfig = {
      ...this.defaultConfig,
      ...config,
      header: {
        'Content-Type': 'application/json',
        ...config.header,
      },
    }

    // 处理 params（GET 请求参数）
    let url = finalConfig.url || ''
    if (finalConfig.params && Object.keys(finalConfig.params).length > 0) {
      const queryString = Object.entries(finalConfig.params)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
        .join('&')
      url = `${url}${url.includes('?') ? '&' : '?'}${queryString}`
    }

    // 执行请求前拦截
    const interceptedConfig = this.beforeRequest(finalConfig)

    try {
      // 发起 Taro 请求
      const response = await Taro.request({
        url: getFullUrl(url),
        method: interceptedConfig.method || 'GET',
        data: interceptedConfig.data,
        header: interceptedConfig.header,
        timeout: interceptedConfig.timeout,
        dataType: interceptedConfig.dataType,
        responseType: interceptedConfig.responseType,
      })
      // 执行响应后拦截
      return await this.afterResponse({ ...response, config: interceptedConfig }, interceptedConfig)
    } catch (error: any) {
      // 判断是否需要重试
      const shouldRetry =
        finalConfig.retry &&
        finalConfig.retry > 0 &&
        // 只对网络错误、超时进行重试
        (error.errMsg?.includes('timeout') || error.errMsg?.includes('fail'))

      if (shouldRetry) {
        try {
          return await this.retryRequest(finalConfig, error)
        } catch (retryError) {
          error = retryError
        }
      }

      // 隐藏 loading
      if (finalConfig.showLoading) {
        stopLoading()
      }

      // 处理错误
      const errorResult = handleHttpError({
        statusCode: error.statusCode || -1,
        data: error.data || error,
        config: finalConfig,
        errMsg: error.errMsg,
      })

      if (finalConfig.customErrorHandler) {
        finalConfig.customErrorHandler(error)
      }

      return Promise.reject(errorResult)
    }
  }

  /**
   * GET 请求
   */
  get<T = any>(
    url: string,
    params?: Record<string, any>,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>({
      url,
      method: 'GET',
      params,
      ...config,
    })
  }

  /**
   * POST 请求
   */
  post<T = any>(url: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>({
      url,
      method: 'POST',
      data,
      ...config,
    })
  }

  /**
   * PUT 请求
   */
  put<T = any>(url: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>({
      url,
      method: 'PUT',
      data,
      ...config,
    })
  }

  /**
   * DELETE 请求
   */
  delete<T = any>(
    url: string,
    params?: Record<string, any>,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>({
      url,
      method: 'DELETE',
      params,
      ...config,
    })
  }
}

// 导出单例
const http = new HttpClient()
export default http
