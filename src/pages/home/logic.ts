export default function useHomeLogic() {

    function fetchData() {
        console.log('按钮被点击了')
    }

    return {
        fetchData,
    }
}