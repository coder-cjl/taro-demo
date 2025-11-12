import Taro from '@tarojs/taro'
import { useState } from 'react'
import { useNavigateRouter } from 'src/routers/navigate'
import { eventBus } from 'src/utils/bus'

// 页面路由常量
export const doctorRouteName = '/pages/doctor/index'

export default function useDoctorLogic() {
  const router = useNavigateRouter()

  function onEventBusClick() {
    eventBus.emit('test-event', { message: 'Hello from Doctor Page!' })
    router.back()

    Taro.request({
      url: 'https://jsonplaceholder.typicode.com/posts/1',
      method: 'GET',
    })
      .then(response => {
        console.log('Request successful:', response.data)
      })
      .catch(error => {
        console.error('Request failed:', error)
      })
  }

  return {
    onEventBusClick,
  }
}
