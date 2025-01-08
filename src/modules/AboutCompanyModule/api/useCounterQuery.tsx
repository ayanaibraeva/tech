import {useQuery} from "@tanstack/react-query";
import {axiosInstance} from "../../../utils/axiosInstance/axiosInstance.ts";
import {BASE_URL} from "../../../utils/constants/constants.ts";

export const useCounterQuery = () => {
    return useQuery({queryKey: ["about_company"], queryFn: async() => {
            const {data} = await axiosInstance.get(`${BASE_URL}about_company/`)
            return data
        }
    })
}