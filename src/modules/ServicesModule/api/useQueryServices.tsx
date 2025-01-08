import {useQuery} from "@tanstack/react-query";
import {axiosInstance} from "../../../utils/axiosInstance/axiosInstance.ts";
import {BASE_URL} from "../../../utils/constants/constants.ts";

export const useQueryServices = () => {
    return useQuery({queryKey: ["services"], queryFn: async () => {
            const { data} = await axiosInstance.get(`${BASE_URL}services/`);
            return data;
        },
    });
};
