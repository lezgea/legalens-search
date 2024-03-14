import axios from 'axios';
import qs from 'qs';
import { getAccessToken, removeAuthCookies, setAuthCookies } from '../utils';

const authToken = getAccessToken();
const BACK_URL = "https://legalens-back.ailab.az";
// const DEV_AI_URL = "https://legalens-api.ailab.az";
const PROD_AI_URL = "https://legalens-prod.ailab.az";


export const backClient = axios.create({
    baseURL: BACK_URL + '/v1',
    headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${authToken}`,
    },
    paramsSerializer: params => {
        return qs.stringify(params, { indices: false });
    },
})


export const aiClient = axios.create({
    // baseURL: DEV_AI_URL,
    baseURL: PROD_AI_URL,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
    },
    paramsSerializer: params => {
        return qs.stringify(params, { indices: false });
    },
})


export const clientPermission = axios.create({
    baseURL: BACK_URL + '/auth',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
    },
    paramsSerializer: params => {
        return qs.stringify(params, { indices: false });
    },
});

clientPermission.interceptors.request.use(
    config => {
        const accessToken = getAccessToken();

        if (!accessToken) {
            // location.href = '/login';
            // return config;
        }

        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    error => Promise.reject(error),
);

clientPermission.interceptors.response.use(
    async response => response,
    async error => {
        const originalRequest = error.config;
        if (error.response && error.response.status === 406 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const authToken = getAccessToken();
                const response = await axios.get(`${BACK_URL}/auth/v1/auth/refresh`, {
                    headers: { Authorization: `Bearer ${authToken}` },
                });
                setAuthCookies(response.data.data.token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.data.token}`;
                originalRequest.headers['Authorization'] = `Bearer ${response.data.data.token}`;
                return axios(originalRequest);
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    removeAuthCookies()
                    window.location.href = '/login';
                }
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    },
);

backClient.interceptors.request.use(
    config => {
        const accessToken = getAccessToken();

        if (!accessToken) {
            // location.href = '/login';
            // return config;
        }

        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    error => Promise.reject(error),
);

let isTokenRefreshing = false;
let refreshSubscribers = [];

function addRefreshSubscriber(callback) {
    refreshSubscribers.push(callback);
}

function processQueue(newToken) {
    refreshSubscribers.forEach(callback => callback(newToken));
    refreshSubscribers = [];
}


backClient.interceptors.response.use(

    response => response,
    async error => {
        const originalRequest = error.config;
        if (error.response && error.response.status === 406 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (!isTokenRefreshing) {
                isTokenRefreshing = true;
                try {
                    const authToken = getAccessToken();
                    const response = await axios.get(`${BACK_URL}/auth/v1/auth/refresh`, {
                        headers: { Authorization: `Bearer ${authToken}` },
                    });
                    removeAuthCookies();
                    setAuthCookies(response?.data?.data?.token);
                    axios.defaults.headers.common['Authorization'] = `Bearer ${response?.data?.data?.token}`;
                    originalRequest.headers['Authorization'] = `Bearer ${response?.data?.data?.token}`;
                    processQueue(response?.data?.data?.token);
                    isTokenRefreshing = false;
                    return axios(originalRequest);
                } catch (error) {
                    if (error?.response && error?.response?.status === 401) {
                        removeAuthCookies();
                        window.location.href = '/login';
                    }
                    return Promise.reject(error);
                }
            } else {
                return new Promise(resolve => {
                    addRefreshSubscriber(newToken => {
                        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                        resolve(axios(originalRequest));
                    });
                });
            }
        } else if (error?.response && error?.response?.status === 401 && !originalRequest._retry) {
            removeAuthCookies();
            // window.location.href = '/login';
        }
        return Promise.reject(error);
    },
);


export const clientLogin = axios.create({
    baseURL: BACK_URL + '/auth',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const clientRegister = axios.create({
    baseURL: BACK_URL + '/auth',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
    },
});

