/**
 * 手机号脱敏
 * @param phone 手机号
 * @example formatPhone('13800138000') // '138****8000'
 */
export function formatPhone(phone: string): string {
  return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}

/**
 * 银行卡号脱敏
 * @param cardNumber 银行卡号
 * @example formatCardNumber('6222021234567890') // '6222 **** **** 7890'
 */
export function formatCardNumber(cardNumber: string): string {
  return cardNumber.replace(/(\d{4})\d+(\d{4})/, '$1 **** **** $2')
}

/**
 * 电子邮箱脱敏
 * @param email 电子邮箱
 * @example formatEmail('example@example.com') // 'examp****@example.com'
 * */
export function formatEmail(email: string): string {
  return email.replace(/(.{5}).+(@.+)/, '$1****$2')
}

/**
 * 名字脱敏
 * @param name 名字
 * @example formatName('张三丰') // '张*丰'
 */
export function formatName(name: string): string {
  if (name.length <= 2) {
    return name[0] + '*'
  } else {
    return name[0] + '*'.repeat(name.length - 2) + name[name.length - 1]
  }
}

/**
 * 身份证号脱敏
 * @param idNumber 身份证号
 * @example formatIdNumber('110101199003078888') // '110101********8888'
 */
export function formatIdNumber(idNumber: string): string {
  return idNumber.replace(/(\d{6})\d+(\d{4})/, '$1********$2')
}

/**
 * 地址脱敏
 * @param address 地址
 * @example formatAddress('北京市朝阳区建国路88号SOHO现代城') // '北京市朝阳区****'
 */
export function formatAddress(address: string): string {
  return address.replace(/(.{6}).+/, '$1****')
}

/**
 * 银行卡号格式化，每4位添加一个空格
 * @param cardNumber 银行卡号
 * @example formatCardNumberWithSpaces('6222021234567890') // '6222 0212 3456 7890'
 */
export function formatCardNumberWithSpaces(cardNumber: string): string {
  return cardNumber.replace(/(.{4})/g, '$1 ').trim()
}

/** * 金额格式化，添加千分位逗号
 * @param amount 金额数字
 * @example formatAmount(1234567.89) // '1,234,567.89'
 */
export function formatAmount(amount: number): string {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

/**
 * 信用卡号格式化，前6后4显示，中间用星号代替
 * @param cardNumber 信用卡号
 * @example formatCreditCardNumber('4111111111111111') // '411111******1111'
 */
export function formatCreditCardNumber(cardNumber: string): string {
  return cardNumber.replace(/(\d{6})\d+(\d{4})/, '$1******$2')
}

/**
 * 车牌号脱敏
 * @param plateNumber 车牌号
 * @example formatPlateNumber('粤B12345D') // '粤B****D'
 */
export function formatPlateNumber(plateNumber: string): string {
  return plateNumber.replace(/(.{2}).+(.{1})/, '$1****$2')
}

/**
 * 姓名首字母大写
 * @param name 姓名
 * @example capitalizeName('zhang san') // 'Zhang San'
 */
export function capitalizeName(name: string): string {
  return name
    .split(' ')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ')
}

/**
 * 将字符串转换为标题格式（每个单词首字母大写）
 * @param str 输入字符串
 * @example toTitleCase('hello world') // 'Hello World'
 */
export function toTitleCase(str: string): string {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/**
 * 句子首字母大写
 * @param str 输入字符串
 * @example capitalizeSentence('hello world. this is a test.') // 'Hello world. This is a test.'
 */
export function capitalizeSentence(str: string): string {
  return str.replace(/(^\s*\w|[.!?]\s*\w)/g, match => match.toUpperCase())
}

/** * 缩略字符串，保留前后若干字符，中间用省略号代替
 * @param str 输入字符串
 * @param frontLen 前部保留长度
 * @param backLen 后部保留长度
 * @example abbreviateString('abcdefghijklmnopqrstuvwxyz', 4, 4) // 'abcd...wxyz'
 */
export function abbreviateString(str: string, frontLen: number, backLen: number): string {
  if (str.length <= frontLen + backLen) {
    return str
  }
  return str.slice(0, frontLen) + '...' + str.slice(-backLen)
}

/** * 格式化文件大小，转换为合适的单位（B, KB, MB, GB）
 * @param bytes 文件大小，单位为字节
 * @example formatFileSize(1048576) // '1.00 MB'
 */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  const units = ['KB', 'MB', 'GB', 'TB']
  let unitIndex = -1
  let size = bytes
  do {
    size /= 1024
    unitIndex++
  } while (size >= 1024 && unitIndex < units.length - 1)
  return `${size.toFixed(2)} ${units[unitIndex]}`
}

/** * 格式化百分比
 * @param value 数值
 * @param decimalPlaces 小数位数，默认2位
 * @example formatPercentage(0.1234) // '12.34%'
 */
export function formatPercentage(value: number, decimalPlaces: number = 2): string {
  const percentage = (value * 100).toFixed(decimalPlaces)
  return `${percentage}%`
}

/**
 * 数字补零
 * @example padZero(5, 3) // '005'
 */
export function padZero(num: number, length: number = 2): string {
  return num.toString().padStart(length, '0')
}
