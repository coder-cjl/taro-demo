import Taro from '@tarojs/taro'

export function useNavigateRouter() {
  /// 返回上一级
  /// delta 参数表示后退的页面数，默认为 1
  function back(delta: number = 1) {
    Taro.navigateBack({ delta })
  }

  /// 跳转到指定路径（保留当前页面，跳转到应用内的某个页面）
  /// 支持传递查询参数
  function toName(path: string, params?: Record<string, any>) {
    let url = path
    if (params) {
      const query = Object.entries(params)
        .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
        .join('&')
      url = `${path}?${query}`
    }
    Taro.navigateTo({ url })
  }

  /// 重定向（关闭当前页面，跳转到应用内的某个页面）
  function replaceTo(path: string, params?: Record<string, any>) {
    let url = path
    if (params) {
      const query = Object.entries(params)
        .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
        .join('&')
      url = `${path}?${query}`
    }
    Taro.redirectTo({ url })
  }

  /// 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
  function toTab(path: string) {
    Taro.switchTab({ url: path })
  }

  /// 关闭所有页面，打开到应用内的某个页面
  function reLaunch(path: string, params?: Record<string, any>) {
    let url = path
    if (params) {
      const query = Object.entries(params)
        .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
        .join('&')
      url = `${path}?${query}`
    }
    Taro.reLaunch({ url })
  }

  /// 获取查询参数
  /// 在页面组件中通过 Taro.getCurrentInstance().router.params 获取
  function getQueryParam(key: string, defaultValue?: string): string | null {
    const router = Taro.getCurrentInstance().router
    const params = router?.params || {}
    return params[key] || defaultValue || null
  }

  /// 获取所有查询参数
  function getAllParams(): Record<string, any> {
    const router = Taro.getCurrentInstance().router
    return router?.params || {}
  }

  /// 获取当前页面路径
  function getCurrentPath(): string {
    const router = Taro.getCurrentInstance().router
    return router?.path || ''
  }

  /// 预加载数据（用于页面跳转前预加载数据）
  function preload(data: Record<string, any>) {
    Taro.preload(data)
  }

  /// 获取预加载的数据
  function getPreloadData(key?: string): any {
    if (key) {
      return Taro.preloadData?.[key]
    }
    return Taro.preloadData
  }

  return {
    back,
    toName,
    replaceTo,
    toTab,
    reLaunch,
    getQueryParam,
    getAllParams,
    getCurrentPath,
    preload,
    getPreloadData,
  }
}
