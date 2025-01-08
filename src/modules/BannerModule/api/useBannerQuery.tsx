import {useQuery} from "@tanstack/react-query";
import {axiosInstance} from "../../../utils/axiosInstance/axiosInstance.ts";
import {BASE_URL} from "../../../utils/constants/constants.ts";

export const useBannerQuery = () => {
    return useQuery({queryKey: ["banner"], queryFn: async() => {
            const {data} = await axiosInstance.get(`${BASE_URL}banner/`)
            return data
        }
    })
}