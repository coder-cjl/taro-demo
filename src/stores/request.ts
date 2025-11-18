// import { useState, useCallback } from 'react'

// interface UseRequestOptions<T> {
//   manual?: boolean // 是否手动触发请求，默认 false（自动触发）
//   onSuccess?: (data: T) => void // 请求成功回调
//   onError?: (error: any) => void // 请求失败回调
// }

// export function useRequest(service, options: UseRequestOptions<any> = {}) {
//   const { manual = false, onSuccess, onError } = options
//   const [loading, setLoading] = useState(false)
//   const [data, setData] = useState(null)
//   const [error, setError] = useState(null)

//   const run = useCallback(
//     async (...args) => {
//       setLoading(true)
//       try {
//         const response = await service(...args)
//         setData(response)
//         onSuccess && onSuccess(response)
//       } catch (err) {
//         setError(err)
//         onError && onError(err)
//       } finally {
//         setLoading(false)
//       }
//     },
//     [service, onSuccess, onError]
//   )

//   if (!manual) {
//     run()
//   }

//   return {
//     loading,
//     data,
//     error,
//     run,
//   }
// }

// function userRequestDemo() {
//   const { loading, data, error, run } = useRequest(someService, {
//     manual: true,
//     onSuccess: (data) => {
//       console.log('Request succeeded with data:', data)
//     },
//     onError: (error) => {
//       console.error('Request failed with error:', error)
//     },
//   })

//   return (
//     <div>
//       <button onClick={run} disabled={loading}>
//         {loading ? 'Loading...' : 'Run Request'}
//       </button>
//       {error && <div>Error: {error.message}</div>}
//       {data && <div>Data: {JSON.stringify(data)}</div>}
//     </div>
//   )
// }
