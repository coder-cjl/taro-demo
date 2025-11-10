/**
 * 值判断工具函数
 * 提供类型安全的空值检查
 */

// ============ 基础类型判断 ============

/**
 * 判断值是否为 undefined
 * @example isUndefined(undefined) // true
 */
export function isUndefined(value: unknown): value is undefined {
  return typeof value === 'undefined'
}

/**
 * 判断值是否为 null
 * @example isNull(null) // true
 */
export function isNull(value: unknown): value is null {
  return value === null
}

/**
 * 判断值是否为 null 或 undefined
 * @example isNullish(null) // true
 * @example isNullish(undefined) // true
 * @example isNullish('') // false
 */
export function isNullish(value: unknown): value is null | undefined {
  return value === null || value === undefined
}

/**
 * 判断值是否为空（null、undefined 或空字符串）
 * @example isEmpty(null) // true
 * @example isEmpty(undefined) // true
 * @example isEmpty('') // true
 * @example isEmpty('  ') // false (使用 isBlank 判断空白字符串)
 */
export function isEmpty(value: unknown): value is null | undefined | '' {
  return value === null || value === undefined || value === ''
}

/**
 * 判断值是否有效（非 null、非 undefined、非空字符串）
 * @example isValidValue('hello') // true
 * @example isValidValue(0) // true
 * @example isValidValue('') // false
 */
export function isValidValue(value: unknown): boolean {
  return !isEmpty(value)
}

// ============ 字符串判断 ============

/**
 * 判断字符串是否为空或只包含空白字符
 * @example isBlank('') // true
 * @example isBlank('  ') // true
 * @example isBlank(' a ') // false
 */
export function isBlank(str: string | null | undefined): boolean {
  return !str || str.trim().length === 0
}

/**
 * 判断字符串是否非空且包含非空白字符
 * @example isNotBlank('hello') // true
 * @example isNotBlank('  ') // false
 */
export function isNotBlank(str: string | null | undefined): boolean {
  return !isBlank(str)
}

// ============ 数组判断 ============

/**
 * 判断数组是否为空
 * @example isEmptyArray([]) // true
 * @example isEmptyArray([1, 2]) // false
 */
export function isEmptyArray<T>(arr: T[] | null | undefined): arr is [] | null | undefined {
  return !arr || arr.length === 0
}

/**
 * 判断数组是否非空
 * @example isNotEmptyArray([1, 2]) // true
 * @example isNotEmptyArray([]) // false
 */
export function isNotEmptyArray<T>(arr: T[] | null | undefined): arr is T[] {
  return !!arr && arr.length > 0
}

// ============ 对象判断 ============

/**
 * 判断对象是否为空（没有自有属性）
 * @example isEmptyObject({}) // true
 * @example isEmptyObject({ a: 1 }) // false
 */
export function isEmptyObject(obj: object | null | undefined): boolean {
  return !obj || (Object.keys(obj).length === 0 && obj.constructor === Object)
}

/**
 * 判断对象是否非空
 * @example isNotEmptyObject({ a: 1 }) // true
 * @example isNotEmptyObject({}) // false
 */
export function isNotEmptyObject(obj: object | null | undefined): boolean {
  return !isEmptyObject(obj)
}

// ============ 通用判断 ============

/**
 * 判断任意值是否为"空"
 * - null/undefined → true
 * - 空字符串 '' → true
 * - 空数组 [] → true
 * - 空对象 {} → true
 * - 其他值 → false
 * 
 * @example isTrulyEmpty(null) // true
 * @example isTrulyEmpty('') // true
 * @example isTrulyEmpty([]) // true
 * @example isTrulyEmpty({}) // true
 * @example isTrulyEmpty(0) // false
 * @example isTrulyEmpty(false) // false
 */
export function isTrulyEmpty(value: unknown): boolean {
  if (value === null || value === undefined) return true
  if (typeof value === 'string') return value.length === 0
  if (Array.isArray(value)) return value.length === 0
  if (typeof value === 'object' && value.constructor === Object) {
    return Object.keys(value).length === 0
  }
  return false
}

// ============ 类型别名(向后兼容) ============

/**
 * @deprecated 使用 isBlank 代替
 */
export const isStringEmpty = isBlank

/**
 * @deprecated 使用 isEmptyArray 代替
 */
export const isArrayEmpty = isEmptyArray

/**
 * @deprecated 使用 isEmptyObject 代替
 */
export const isObjectEmpty = isEmptyObject

/**
 * @deprecated 使用 isEmpty 代替
 */
export const isNullOrUndefined = isEmpty