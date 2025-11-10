import Taro from '@tarojs/taro'

export function startLoading(msg: string) {
  Taro.showLoading({ title: msg, mask: true })
}

export function stopLoading() {
  Taro.hideLoading()
}

export function showToast(msg: string, duration?: number) {
  Taro.showToast({ title: msg, duration: duration || 2000, icon: 'none' })
}

export function showSuccess(msg: string, duration?: number) {
  Taro.showToast({ title: msg, icon: 'success', duration: duration || 2000 })
}

export function showError(msg: string, duration?: number) {
  Taro.showToast({ title: msg, icon: 'error', duration: duration || 2000 })
}
