import {useQuery} from "@tanstack/react-query";
import {axiosInstance} from "../../../utils/axiosInstance/axiosInstance.ts";
import {BASE_URL} from "../../../utils/constants/constants.ts";

export const useServicesTypesQuery = () => {
    return useQuery({queryKey: ["types_of_service"], queryFn: async () => {
            const { data} = await axiosInstance.get(`${BASE_URL}types_of_service/`);
            return data;
        },
    });
};
