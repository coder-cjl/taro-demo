/**
 * 解析 URL 参数
 * @example parseUrlParams('?id=123&name=luca') // { id: '123', name: 'luca' }
 */
export function parseUrlParams(url: string): Record<string, string> {
  const params: Record<string, string> = {}
  const searchParams = new URLSearchParams(url.includes('?') ? url.split('?')[1] : url)
  searchParams.forEach((value, key) => {
    params[key] = value
  })
  return params
}

/**
 * 构建 URL 参数
 * @example buildUrlParams({ id: 123, name: 'luca' }) // 'id=123&name=luca'
 */
export function buildUrlParams(params: Record<string, any>): string {
  return Object.entries(params)
    .filter(([_, value]) => value !== undefined && value !== null)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
    .join('&')
}

/**
 * 给 URL 添加参数
 * @example addUrlParams('/api/user', { id: 123 }) // '/api/user?id=123'
 */
export function addUrlParams(url: string, params: Record<string, any>): string {
  const queryString = buildUrlParams(params)
  if (!queryString) return url
  return url.includes('?') ? `${url}&${queryString}` : `${url}?${queryString}`
}
