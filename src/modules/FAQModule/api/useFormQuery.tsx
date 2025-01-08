import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {BASE_URL} from "../../../utils/constants/constants.ts";
interface FormData {
    name: string;
    company_name?: string;
    phone_number: number;
    description: string;
}
interface ApiResponse {
    success: boolean;
    message: string;
}

export const useFormQuery = () => {
    const queryClient = useQueryClient();

    return useMutation<ApiResponse, unknown, FormData>({
        mutationFn: async (formData: FormData) => {
            const { data } = await axios.post(`${BASE_URL}application/`, formData);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["application"] });
        },
    });
};
