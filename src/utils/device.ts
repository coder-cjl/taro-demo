import Taro from '@tarojs/taro'

let systemInfo: Taro.getSystemInfoSync.Result | null = null

/**
 * 获取系统信息（缓存）
 */
export function getSystemInfo() {
  if (!systemInfo) {
    systemInfo = Taro.getSystemInfoSync()
  }
  return systemInfo
}

/**
 * 获取屏幕宽度
 */
export function getScreenWidth(): number {
  return getSystemInfo().screenWidth
}

/**
 * 获取屏幕高度
 */
export function getScreenHeight(): number {
  return getSystemInfo().screenHeight
}

/**
 * 获取状态栏高度
 */
export function getStatusBarHeight(): number {
  return getSystemInfo().statusBarHeight || 0
}

/**
 * rpx 转 px
 */
export function rpxToPx(rpx: number): number {
  return (rpx / 750) * getScreenWidth()
}

/**
 * px 转 rpx
 */
export function pxToRpx(px: number): number {
  return (px / getScreenWidth()) * 750
}
