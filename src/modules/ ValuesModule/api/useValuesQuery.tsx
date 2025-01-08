import {useQuery} from "@tanstack/react-query";
import {axiosInstance} from "../../../utils/axiosInstance/axiosInstance.ts";
import {BASE_URL} from "../../../utils/constants/constants.ts";

export const useValuesQuery = () => {
    return useQuery({queryKey: ["our_values"], queryFn: async() => {
            const {data} = await axiosInstance.get(`${BASE_URL}our_values/`)
            return data
        }
    })
}