import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../utils/axiosInstance/axiosInstance.ts";
import { BASE_URL } from "../../../utils/constants/constants.ts";


type CounterDataType = {
    id: string | number;
    image: string;
    "image2": string;
    "video2": string;
    description: string | number;
    details: [
        {
            id: number;
            volume: number;
            sign: string;
            title: string;
            description: string;
        }
    ];
};

export const useCounterQuery = () => {
    return useQuery<CounterDataType[], Error>({
        queryKey: ["about_company"],
        queryFn: async () => {
            const { data } = await axiosInstance.get(`${BASE_URL}about_company/`);
            return data;
        },
    });
};
