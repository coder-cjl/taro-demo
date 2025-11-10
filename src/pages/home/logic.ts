import {
  showError,
  showSuccess,
  showToast,
  startLoading,
  stopLoading,
} from 'src/components/luca-ui'
import { useNavigateRouter } from 'src/routers/navigate'
import logger from 'src/utils/log'

export default function useHomeLogic() {
  const navigate = useNavigateRouter()

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

  return {
    fetchData,
    onShowLoading,
    onStopLoading,
    onShowSuccess,
    onShowError,
    onShowToast,
  }
}
