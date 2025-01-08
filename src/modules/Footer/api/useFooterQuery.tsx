import {useQuery} from "@tanstack/react-query";
import {axiosInstance} from "../../../utils/axiosInstance/axiosInstance.ts";
import {BASE_URL} from "../../../utils/constants/constants.ts";

export const useFooterQuery = () => {
    return useQuery({queryKey: ["contact"], queryFn: async() => {
            const {data} = await axiosInstance.get(`${BASE_URL}contact/`)
            return data
        }
    })
}