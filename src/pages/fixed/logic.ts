import { useNavigateRouter } from 'src/routers/navigate'

// 页面路由常量
export const routeName = '/pages/fixed/index'

export default function useFixedPageLogic() {
  function onBack() {
    useNavigateRouter().back()
  }

  return {
    onBack,
  }
}
