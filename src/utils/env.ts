// 判断是否为开发环境
export const isDev = process.env.NODE_ENV === 'development'

/// 判断是否为 Node.js 环境
export const isNode =
  typeof process !== 'undefined' && process.release && process.release.name === 'node'

/// 判断是否为浏览器环境
export const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined'

/// 判断运行环境
export const isH5 = process.env.TARO_ENV === 'h5'

/// 判断是否为微信小程序环境
export const isWeapp = process.env.TARO_ENV === 'weapp'

/// 判断是否为支付宝小程序环境
export const isAlipay = process.env.TARO_ENV === 'alipay'

/// 判断是否为字节跳动小程序环境
export const isByteDance = process.env.TARO_ENV === 'tt'

/// 判断是否为QQ小程序环境
export const isQQ = process.env.TARO_ENV === 'qq'

/// 判断是否为京东小程序环境
export const isJD = process.env.TARO_ENV === 'jd'

/// 判断是否为快应用环境
export const isQuickApp = process.env.TARO_ENV === 'quickapp'
