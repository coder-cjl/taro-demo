import { useState } from 'react'
import { useNavigateRouter } from 'src/routers/navigate'

export default function useLoginLogic() {
  const router = useNavigateRouter()

  // 示例状态
  const [loading, setLoading] = useState(false)

  // 示例方法
  const handleClick = () => {
    console.log('Login page clicked')
  }

  return {
    loading,
    handleClick,
  }
}
