/**
 * 日期时间工具类
 * 适用于 Taro 小程序开发
 */

// ============ 日期格式化 ============

/**
 * 日期格式化
 * @param date 日期对象
 * @param format 格式化模板
 * 支持: YYYY-年 MM-月 DD-日 hh-时 mm-分 ss-秒 SSS-毫秒 W-星期
 * @example formatDate(new Date(), 'YYYY-MM-DD hh:mm:ss') // '2025-11-10 14:30:25'
 */
export function formatDate(date: Date, format: string = 'YYYY-MM-DD hh:mm:ss'): string {
  const weekDays = ['日', '一', '二', '三', '四', '五', '六']
  
  const map: { [key: string]: string } = {
    YYYY: date.getFullYear().toString(),
    MM: (date.getMonth() + 1).toString().padStart(2, '0'),
    DD: date.getDate().toString().padStart(2, '0'),
    hh: date.getHours().toString().padStart(2, '0'),
    mm: date.getMinutes().toString().padStart(2, '0'),
    ss: date.getSeconds().toString().padStart(2, '0'),
    SSS: date.getMilliseconds().toString().padStart(3, '0'),
    W: weekDays[date.getDay()],
  }

  return format.replace(/YYYY|MM|DD|hh|mm|ss|SSS|W/g, matched => map[matched])
}

/**
 * 获取当前日期时间字符串
 * @param format 格式化模板
 * @example getCurrentDateString() // '2025-11-10 14:30:25'
 */
export function getCurrentDateString(format: string = 'YYYY-MM-DD hh:mm:ss'): string {
  return formatDate(new Date(), format)
}

/**
 * 格式化为相对时间
 * @example formatRelativeTime(Date.now() - 60000) // '1分钟前'
 */
export function formatRelativeTime(timestamp: number): string {
  const now = Date.now()
  const diff = now - timestamp
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const months = Math.floor(days / 30)
  const years = Math.floor(days / 365)

  if (seconds < 60) return '刚刚'
  if (minutes < 60) return `${minutes}分钟前`
  if (hours < 24) return `${hours}小时前`
  if (days < 30) return `${days}天前`
  if (months < 12) return `${months}个月前`
  return `${years}年前`
}

/**
 * 格式化为友好时间显示
 * 今天: 14:30  昨天: 昨天 14:30  更早: 11-08 14:30
 * @example formatFriendlyTime(timestamp) // '昨天 14:30'
 */
export function formatFriendlyTime(timestamp: number): string {
  const date = new Date(timestamp)
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  const isSameDay = (d1: Date, d2: Date) => 
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()

  const timeStr = formatDate(date, 'hh:mm')

  if (isSameDay(date, today)) {
    return timeStr // '14:30'
  } else if (isSameDay(date, yesterday)) {
    return `昨天 ${timeStr}` // '昨天 14:30'
  } else if (date.getFullYear() === today.getFullYear()) {
    return formatDate(date, 'MM-DD hh:mm') // '11-08 14:30'
  } else {
    return formatDate(date, 'YYYY-MM-DD hh:mm') // '2024-11-08 14:30'
  }
}

// ============ 时间戳转换 ============

/**
 * 将时间戳转换为日期对象
 * @param timestamp 时间戳(毫秒)
 * @example timestampToDate(1699603200000)
 */
export function timestampToDate(timestamp: number): Date {
  return new Date(timestamp)
}

/**
 * 将日期对象转换为时间戳
 * @param date 日期对象
 * @example dateToTimestamp(new Date()) // 1699603200000
 */
export function dateToTimestamp(date: Date): number {
  return date.getTime()
}

/**
 * 将时间戳转换为格式化字符串
 * @example timestampToFormattedString(1699603200000, 'YYYY-MM-DD') // '2023-11-10'
 */
export function timestampToFormattedString(
  timestamp: number,
  format: string = 'YYYY-MM-DD hh:mm:ss'
): string {
  return formatDate(new Date(timestamp), format)
}

/**
 * 将日期字符串转换为时间戳
 * @example formattedStringToTimestamp('2023-11-10') // 1699603200000
 */
export function formattedStringToTimestamp(dateString: string): number {
  return new Date(dateString).getTime()
}

// ============ 日期计算 ============

/**
 * 计算两个日期之间的天数差
 * @example dateDiffInDays(new Date('2023-11-01'), new Date('2023-11-10')) // 9
 */
export function dateDiffInDays(date1: Date, date2: Date): number {
  const diffTime = Math.abs(date2.getTime() - date1.getTime())
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

/**
 * 计算两个日期之间的小时差
 * @example dateDiffInHours(date1, date2) // 48
 */
export function dateDiffInHours(date1: Date, date2: Date): number {
  const diffTime = Math.abs(date2.getTime() - date1.getTime())
  return Math.floor(diffTime / (1000 * 60 * 60))
}

/**
 * 计算两个日期之间的分钟差
 * @example dateDiffInMinutes(date1, date2) // 120
 */
export function dateDiffInMinutes(date1: Date, date2: Date): number {
  const diffTime = Math.abs(date2.getTime() - date1.getTime())
  return Math.floor(diffTime / (1000 * 60))
}

/**
 * 添加天数
 * @example addDays(new Date(), 7) // 7天后的日期
 */
export function addDays(date: Date, days: number): Date {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

/**
 * 添加小时
 * @example addHours(new Date(), 2) // 2小时后的时间
 */
export function addHours(date: Date, hours: number): Date {
  const result = new Date(date)
  result.setHours(result.getHours() + hours)
  return result
}

/**
 * 添加分钟
 * @example addMinutes(new Date(), 30) // 30分钟后的时间
 */
export function addMinutes(date: Date, minutes: number): Date {
  const result = new Date(date)
  result.setMinutes(result.getMinutes() + minutes)
  return result
}

// ============ 日期判断 ============

/**
 * 判断是否为闰年
 * @example isLeapYear(2024) // true
 */
export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

/**
 * 判断是否为今天
 * @example isToday(new Date()) // true
 */
export function isToday(date: Date): boolean {
  const today = new Date()
  return date.getFullYear() === today.getFullYear() &&
         date.getMonth() === today.getMonth() &&
         date.getDate() === today.getDate()
}

/**
 * 判断是否为昨天
 * @example isYesterday(date) // true
 */
export function isYesterday(date: Date): boolean {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  return date.getFullYear() === yesterday.getFullYear() &&
         date.getMonth() === yesterday.getMonth() &&
         date.getDate() === yesterday.getDate()
}

/**
 * 判断是否为本周
 * @example isThisWeek(date) // true
 */
export function isThisWeek(date: Date): boolean {
  const today = new Date()
  const startOfWeek = new Date(today)
  startOfWeek.setDate(today.getDate() - today.getDay())
  startOfWeek.setHours(0, 0, 0, 0)
  
  const endOfWeek = new Date(startOfWeek)
  endOfWeek.setDate(startOfWeek.getDate() + 7)
  
  return date >= startOfWeek && date < endOfWeek
}

/**
 * 判断是否为本月
 * @example isThisMonth(date) // true
 */
export function isThisMonth(date: Date): boolean {
  const today = new Date()
  return date.getFullYear() === today.getFullYear() &&
         date.getMonth() === today.getMonth()
}

/**
 * 判断是否为工作日(周一到周五)
 * @example isWeekday(new Date()) // true/false
 */
export function isWeekday(date: Date): boolean {
  const day = date.getDay()
  return day !== 0 && day !== 6
}

/**
 * 判断是否为周末(周六或周日)
 * @example isWeekend(new Date()) // true/false
 */
export function isWeekend(date: Date): boolean {
  const day = date.getDay()
  return day === 0 || day === 6
}

// ============ 实用工具 ============

/**
 * 获取月份的天数
 * @example getDaysInMonth(2024, 2) // 29 (闰年2月)
 */
export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate()
}

/**
 * 获取一天的开始时间(00:00:00)
 * @example getStartOfDay(new Date()) // 2025-11-10 00:00:00
 */
export function getStartOfDay(date: Date): Date {
  const result = new Date(date)
  result.setHours(0, 0, 0, 0)
  return result
}

/**
 * 获取一天的结束时间(23:59:59)
 * @example getEndOfDay(new Date()) // 2025-11-10 23:59:59
 */
export function getEndOfDay(date: Date): Date {
  const result = new Date(date)
  result.setHours(23, 59, 59, 999)
  return result
}

/**
 * 获取本周开始时间(周日 00:00:00)
 * @example getStartOfWeek(new Date())
 */
export function getStartOfWeek(date: Date): Date {
  const result = new Date(date)
  result.setDate(result.getDate() - result.getDay())
  result.setHours(0, 0, 0, 0)
  return result
}

/**
 * 获取本月开始时间
 * @example getStartOfMonth(new Date()) // 2025-11-01 00:00:00
 */
export function getStartOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

/**
 * 获取本月结束时间
 * @example getEndOfMonth(new Date()) // 2025-11-30 23:59:59
 */
export function getEndOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999)
}

/**
 * 解析 ISO 8601 日期字符串(兼容小程序)
 * 小程序某些平台不支持 ISO 格式,需要转换
 * @example parseISODate('2023-11-10T14:30:25.000Z')
 */
export function parseISODate(isoString: string): Date {
  // 替换 'T' 和 'Z' 为空格,兼容所有平台
  const normalized = isoString.replace('T', ' ').replace('Z', '')
  return new Date(normalized)
}

/**
 * 格式化倒计时
 * @param seconds 剩余秒数
 * @returns 格式化的倒计时字符串
 * @example formatCountdown(3661) // '01:01:01'
 */
export function formatCountdown(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  return [hours, minutes, secs]
    .map(v => v.toString().padStart(2, '0'))
    .join(':')
}
