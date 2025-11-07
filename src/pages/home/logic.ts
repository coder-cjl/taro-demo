import logger from "src/utils/log"

export default function useHomeLogic() {

    function fetchData() {
        logger.debug('fetchData 函数被调用')
        logger.info('开始模拟数据请求')
        logger.warn('注意：这是一个模拟请求，没有实际数据交互')
        logger.error('如果这是生产环境，请检查网络连接')

        logger.group("grouped logs", () => {
            logger.info("这是分组内的第一条日志")
            logger.info("这是分组内的第二条日志")
            logger.info("这是分组内的第三条日志")
        })

        logger.table([
            { id: 1, name: "Alice", age: 30 },
            { id: 2, name: "Bob", age: 25 },
            { id: 3, name: "Charlie", age: 35 },
        ])
    }

    return {
        fetchData,
    }
}