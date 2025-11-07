import logger from "src/utils/log"

export default function useHomeLogic() {

    function fetchData() {
        logger.debug('fetchData 函数被调用')
        logger.info('开始模拟数据请求')
        logger.warn('注意：这是一个模拟请求，没有实际数据交互')
        logger.error('如果这是生产环境，请检查网络连接')
    }

    return {
        fetchData,
    }
}