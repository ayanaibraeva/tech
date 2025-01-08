import axios from "axios";
import {BASE_URL} from "../constants/constants.ts";

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
})

axiosInstance.interceptors.request.use((config) => {
    config.headers['Accept-Language'] = localStorage.getItem('i18nextLng') || 'ru';
    return config;
})

