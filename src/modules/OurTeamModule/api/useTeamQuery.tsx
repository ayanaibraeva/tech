import {useQuery} from "@tanstack/react-query";
import {axiosInstance} from "../../../utils/axiosInstance/axiosInstance.ts";
import {BASE_URL} from "../../../utils/constants/constants.ts";

export const useTeamQuery = () => {
    return useQuery( {
        queryKey: ["our_team"],
        queryFn: async () => {
            const { data } = await axiosInstance.get(`${BASE_URL}our_team/`)
            return data;
        }
    })
}