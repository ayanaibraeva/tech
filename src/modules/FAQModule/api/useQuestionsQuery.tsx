import {useQuery} from "@tanstack/react-query";
import {axiosInstance} from "../../../utils/axiosInstance/axiosInstance.ts";
import {BASE_URL} from "../../../utils/constants/constants.ts";

export const useQuestionsQuery = () => {
    return useQuery(
        {queryKey: ["faq"],
            queryFn: async () => {
                const { data} = await axiosInstance.get(`${BASE_URL}faq/`);
                return data;
        },
    });
};
