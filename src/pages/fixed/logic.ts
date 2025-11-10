import { useNavigateRouter } from 'src/routers/navigate'

export default function useFixedPageLogic() {
  function onBack() {
    useNavigateRouter().back()
  }

  return {
    onBack,
  }
}
