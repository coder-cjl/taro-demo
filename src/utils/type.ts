/// 判断一个值是否为数字
export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value);
}

/// 判断一个值是否为字符串
export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

/// 判断一个值是否为布尔值
export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

/// 判断一个值是否为函数
export function isFunction(value: unknown): value is Function {
  return typeof value === 'function';
}

/// 判断一个值是否为对象（不包括 null 和数组）
export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/// 判断一个值是否为数组
export function isArray(value: unknown): value is Array<unknown> {
  return Array.isArray(value);
}

