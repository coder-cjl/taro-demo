import { useShareAppMessage } from '@tarojs/taro'

export function useShareMessage(title) {
  useShareAppMessage(() => {
    return {
      title: title || '健康管理',
    }
  })
}
