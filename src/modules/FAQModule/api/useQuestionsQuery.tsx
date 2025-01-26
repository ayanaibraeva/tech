import {useQuery} from "@tanstack/react-query";
import {axiosInstance} from "../../../utils/axiosInstance/axiosInstance.ts";
import {BASE_URL} from "../../../utils/constants/constants.ts";

type questionsDataType = {
    "id": number,
    "question": string,
    "answer": string
};
export const useQuestionsQuery = () => {
    return useQuery<questionsDataType[], Error>(
        {queryKey: ["faq"],
            queryFn: async () => {
                const { data} = await axiosInstance.get(`${BASE_URL}faq/`);
                return data;
        },
    });
};
