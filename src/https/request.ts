import http from './http'
import type { RequestConfig, ApiResponse } from './types'

/**
 * GET 请求
 */
export function apiGet<T = unknown>(
  url: string,
  params?: Record<string, any>,
  config?: RequestConfig
): Promise<ApiResponse<T>> {
  return http.get<T>(url, params, config)
}

/**
 * POST 请求
 */
export function apiPost<T = unknown>(
  url: string,
  data?: any,
  config?: RequestConfig
): Promise<ApiResponse<T>> {
  return http.post<T>(url, data, config)
}

/**
 * PUT 请求
 */
export function apiPut<T = unknown>(
  url: string,
  data?: any,
  config?: RequestConfig
): Promise<ApiResponse<T>> {
  return http.put<T>(url, data, config)
}

/**
 * DELETE 请求
 */
export function apiDelete<T = unknown>(
  url: string,
  params?: Record<string, any>,
  config?: RequestConfig
): Promise<ApiResponse<T>> {
  return http.delete<T>(url, params, config)
}

// 导出默认请求方法
export default {
  get: apiGet,
  post: apiPost,
  put: apiPut,
  delete: apiDelete,
}
