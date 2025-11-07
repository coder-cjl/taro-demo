// 判断是否为开发环境
const isDev = process.env.NODE_ENV === 'development'

type LogLevel = 'debug' | 'info' | 'warn' | 'error'

interface LogOptions {
  showTime?: boolean    // 是否显示时间戳
  showLevel?: boolean   // 是否显示日志级别
  prefix?: string       // 自定义前缀
}

const defaultOptions: LogOptions = {
  showTime: true,
  showLevel: true,
  prefix: ''
}

function formatTime(): string {
  const now = new Date()
  const pad = (num: number) => String(num).padStart(2, '0')
  return `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`
}

function log(level: LogLevel, options: LogOptions = {}, ...args: unknown[]) {
  // 生产环境不输出 debug 日志
  if (!isDev && level === 'debug') return

  const opts = { ...defaultOptions, ...options }
  const parts: string[] = []

  // 添加自定义前缀
  if (opts.prefix) {
    parts.push(`[${opts.prefix}]`)
  }

  // 添加时间戳
  if (opts.showTime) {
    parts.push(`[${formatTime()}]`)
  }

  // 添加日志级别
  if (opts.showLevel) {
    parts.push(`[${level.toUpperCase()}]`)
  }

  const prefix = parts.join('')

  // 根据不同级别输出日志
  switch (level) {
    case 'debug':
      console.debug(prefix, ...args)
      break
    case 'info':
      console.info(prefix, ...args)
      break
    case 'warn':
      console.warn(prefix, ...args)
      break
    case 'error':
      console.error(prefix, ...args)
      break
  }
}

export const logger = {
  /**
   * 调试日志 - 仅在开发环境输出
   * @param args 日志内容
   */
  debug: (...args: unknown[]) => log('debug', {}, ...args),

  /**
   * 信息日志
   * @param args 日志内容
   */
  info: (...args: unknown[]) => log('info', {}, ...args),

  /**
   * 警告日志
   * @param args 日志内容
   */
  warn: (...args: unknown[]) => log('warn', {}, ...args),

  /**
   * 错误日志
   * @param args 日志内容
   */
  error: (...args: unknown[]) => log('error', {}, ...args),

  /**
   * 自定义日志 - 可配置选项
   * @param level 日志级别
   * @param options 日志选项
   * @param args 日志内容
   */
  custom: (level: LogLevel, options: LogOptions, ...args: unknown[]) => {
    log(level, options, ...args)
  },

  /**
   * 分组日志 - 用于组织相关日志
   * @param label 分组标签
   * @param callback 分组内的日志回调
   */
  group: (label: string, callback: () => void) => {
    console.group(label)
    callback()
    console.groupEnd()
  },

  /**
   * 表格日志 - 以表格形式展示数据
   * @param data 数据对象或数组
   */
  table: (data: any) => {
    if (isDev) {
      console.table(data)
    }
  },

  /**
   * 性能计时开始
   * @param label 计时标签
   */
  timeStart: (label: string) => {
    if (isDev) {
      console.time(label)
    }
  },

  /**
   * 性能计时结束
   * @param label 计时标签
   */
  timeEnd: (label: string) => {
    if (isDev) {
      console.timeEnd(label)
    }
  }
}

export default logger
