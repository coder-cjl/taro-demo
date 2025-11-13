/** 判断是否为有效的手机号
 * @example isPhone('13800138000') // true
 */
export function isPhone(phone: string): boolean {
  return /^1[3-9]\d{9}$/.test(phone)
}

/** 判断是否为有效的电子邮箱
 * @example isEmail('example@example.com') // true
 */
export function isEmail(email: string): boolean {
  return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)
}

/** 判断是否为有效的URL
 * @example isURL('https://www.example.com') // true
 */
export function isURL(url: string): boolean {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // 协议
      '((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.)+[a-zA-Z]{2,}|' + // 域名
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // 或 IP 地址
      '(\\:\\d+)?(\\/[-a-zA-Z\\d%_.~+]*)*' + // 端口和路径
      '(\\?[;&a-zA-Z\\d%_.~+=-]*)?' + // 查询字符串
      '(\\#[-a-zA-Z\\d_]*)?$',
    'i' // 锚点
  )
  return pattern.test(url)
}

/**
 * 判断密码强度（至少8个字符，包含大写字母、小写字母、数字和特殊字符）
 * @example isStrongPassword('Aa1@abcd') // true
 */
export function isStrongPassword(password: string): boolean {
  // 至少8个字符，包含大写字母、小写字母、数字和特殊字符
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)
}
