import Taro from '@tarojs/taro'

interface LucsStorageData<T> {
  data: T
  expiry: number | null // 过期时间戳，null表示不过期
}

export function setStorage<T>(key: string, value: T, ttlInSeconds?: number) {
  const expiry = ttlInSeconds ? Date.now() + ttlInSeconds * 1000 : null
  const storageData: LucsStorageData<T> = { data: value, expiry }
  Taro.setStorageSync(key, JSON.stringify(storageData))
}

export function getStorage<T>(key: string): T | null {
  const item = Taro.getStorageSync(key)
  if (!item) return null

  try {
    const storageData: LucsStorageData<T> = JSON.parse(item)
    if (storageData.expiry && Date.now() > storageData.expiry) {
      // 已过期
      Taro.removeStorageSync(key)
      return null
    }
    return storageData.data
  } catch {
    return null
  }
}

export function removeStorage(key: string) {
  Taro.removeStorageSync(key)
}

export function clearStorage() {
  Taro.clearStorageSync()
}

export function clearExpiredStorage() {
  const now = Date.now()
  for (let i = 0; i < Taro.getStorageInfoSync().keys.length; i++) {
    const key = Taro.getStorageInfoSync().keys[i]
    if (key) {
      const item = Taro.getStorageSync(key)
      if (item) {
        try {
          const storageData = JSON.parse(item) as LucsStorageData<unknown>
          if (storageData.expiry && now > storageData.expiry) {
            Taro.removeStorageSync(key)
          }
        } catch {
          // 忽略解析错误
        }
      }
    }
  }
}

export function getAllStorageKeys(): string[] {
  return Taro.getStorageInfoSync().keys
}

export function getStorageInfo() {
  return Taro.getStorageInfoSync()
}
