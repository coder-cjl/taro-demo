import { useState } from 'react'
import {
  showError,
  showSuccess,
  showToast,
  startLoading,
  stopLoading,
} from 'src/components/luca-ui'
import { useNavigateRouter } from 'src/routers/navigate'
import { User, UserLogin, UserProfile, useUserStore } from 'src/stores/user'
import logger from 'src/utils/log'

export default function useHomeLogic() {
  const navigate = useNavigateRouter()

  const [visibleBottom, setVisibleBottom] = useState(false)
  const [visibleCenter, setVisibleCenter] = useState(false)
  const [visibleTop, setVisibleTop] = useState(false)

  function fetchData() {
    // logger.debug('fetchData 函数被调用')
    // logger.info('开始模拟数据请求')
    // logger.warn('注意：这是一个模拟请求，没有实际数据交互')
    // logger.error('如果这是生产环境，请检查网络连接')

    // logger.group("grouped logs", () => {
    //     logger.info("这是分组内的第一条日志")
    //     logger.info("这是分组内的第二条日志")
    //     logger.info("这是分组内的第三条日志")
    // })

    // logger.table([
    //     { id: 1, name: "Alice", age: 30 },
    //     { id: 2, name: "Bob", age: 25 },
    //     { id: 3, name: "Charlie", age: 35 },
    // ])

    navigate.toName('/pages/fixed/index')
  }

  function onShowLoading() {
    startLoading('加载中...')

    setTimeout(() => {
      stopLoading()
    }, 2000)
  }

  function onStopLoading() {
    stopLoading()
  }

  function onShowSuccess() {
    showSuccess('操作成功')
  }

  function onShowError() {
    showError('操作失败')
  }

  function onShowToast() {
    showToast('这是一个普通的 Toast')
  }

  function onSetBottomVisible(visible: boolean) {
    setVisibleBottom(visible)
  }

  function onSetCenterVisible(visible: boolean) {
    setVisibleCenter(visible)
  }

  function onSetTopVisible(visible: boolean) {
    setVisibleTop(visible)
  }

  function onSetUserInfo() {
    const profile: UserProfile = {
      id: 1,
      username: 'Luca User',
      email: 'luca@example.com',
      avatarUrl: 'https://example.com/avatar.jpg',
    }

    const login: UserLogin = {
      id: 1,
      accessToken: 'access-token-123',
      refreshToken: 'refresh-token-456',
    }

    const user: User = {
      profile,
      tokens: login,
    }

    useUserStore.getState().setUser(user)
    logger.info('用户信息已设置', user)
  }

  return {
    fetchData,
    onShowLoading,
    onStopLoading,
    onShowSuccess,
    onShowError,
    onShowToast,
    onSetUserInfo,
    visibleBottom,
    visibleCenter,
    visibleTop,
    onSetBottomVisible,
    onSetCenterVisible,
    onSetTopVisible,
  }
}
