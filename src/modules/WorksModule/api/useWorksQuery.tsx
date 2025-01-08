import {useQuery} from "@tanstack/react-query";
import {axiosInstance} from "../../../utils/axiosInstance/axiosInstance.ts";
import {BASE_URL} from "../../../utils/constants/constants.ts";

export const useWorksQuery = () => {
    return useQuery({
        queryKey: ["how_we_work"],
        queryFn: async () => {
            const {data} = await axiosInstance.get(`${BASE_URL}how_we_work/`);
            return data;
        }
    })
}