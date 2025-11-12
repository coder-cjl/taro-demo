import Taro from '@tarojs/taro'
import { useEffect, useState } from 'react'
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
import { routeName as fixedRouteName } from 'src/pages/fixed/logic'
import { doctorRouteName } from '../doctor/logic'
import { eventBus } from 'src/utils/bus'

export default function useHomeLogic() {
  const navigate = useNavigateRouter()

  const [visibleBottom, setVisibleBottom] = useState(false)
  const [visibleCenter, setVisibleCenter] = useState(false)
  const [visibleTop, setVisibleTop] = useState(false)

  useEffect(() => {
    eventBus.on('test-event', data => {
      logger.info('收到 test-event 事件，数据为：', data)
    })
    return () => {
      eventBus.off('test-event')
    }
  }, [])

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

    navigate.toName(fixedRouteName)
    navigate.toName(doctorRouteName)
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

  async function onWechatLogin() {
    logger.debug('模拟微信登录流程开始')
    await Taro.checkSession({
      success: function () {
        logger.debug('checkSession 成功回调, session 未过期')
      },
      fail: async function () {
        logger.debug('checkSession 失败回调, 开始调用 Taro.login')
        const resp = await Taro.login()
        if (resp.code) {
          logger.debug('微信登录成功，获取到 code:', resp.code)
          showSuccess('微信登录成功')
        } else {
          logger.error('微信登录失败，错误信息:', resp.errMsg)
          showError('微信登录失败')
        }
      },
      complete: function (complete: unknown) {
        logger.debug('checkSession 完成回调:', complete)
      },
    })
  }

  function onToMine() {
    logger.debug('跳转到 Doctor 页面')
    navigate.toName(doctorRouteName)
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
    onWechatLogin,
    onToMine,
  }
}
