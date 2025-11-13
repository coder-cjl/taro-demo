import Taro from '@tarojs/taro'
import { showSuccess, showError } from 'src/components/luca-ui'

/**
 * 复制到剪贴板
 */
export async function copyToClipboard(text: string, showTip: boolean = true): Promise<boolean> {
  try {
    await Taro.setClipboardData({
      data: text,
      success: () => {
        if (showTip) showSuccess('复制成功')
      },
    })
    return true
  } catch (error) {
    if (showTip) showError('复制失败')
    return false
  }
}

/**
 * 从剪贴板读取
 */
export async function readFromClipboard(): Promise<string | null> {
  try {
    const res = await Taro.getClipboardData()
    return res.data
  } catch {
    return null
  }
}
