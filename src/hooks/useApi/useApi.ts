// import {useEffect, useState} from "react";
// import {axiosInstance} from "../../utils/axiosInstance/axiosInstance.ts"
// export const useApi = (url) => {
//     const [data, setData] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//
//     // useEffect(() => {
//         setLoading(true)
//
//         axiosInstance.get(url)
//             .then(response => {
//                 setData(response.data)
//             })
//             .catch(error => {
//                 setError(error)
//             })
//             .finally(() => {
//                 setLoading(false)
//             })
//     }, [url])
//
//     return {data, loading, error}
// }