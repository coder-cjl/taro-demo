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
  }

  return {
    onEventBusClick,
  }
}
