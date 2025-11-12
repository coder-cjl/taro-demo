import { useState } from 'react'
import { useNavigateRouter } from 'src/routers/navigate'

// 页面路由常量
export const doctorRouteName = '/pages/doctor/index'

export default function useDoctorLogic() {
  const router = useNavigateRouter()

  // 示例状态
  const [loading, setLoading] = useState(false)

  // 示例方法
  const handleClick = () => {
    console.log('Doctor page clicked')
  }

  return {
    loading,
    handleClick,
  }
}
