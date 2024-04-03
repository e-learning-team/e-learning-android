import axios from 'axios';
import { deleteToken, deleteUser, getAccessToken, getRefreshToken, saveToken } from '../storage/AsyncStorage';
import { apiRefreshToken } from './refreshToken';
import { logout, updateToken } from '../store/User/userSlice';
import { apiLogOut } from './user';
const instance = axios.create({
    baseURL: 'http://10.0.2.2:8080/e-learning/api',
    'Content-Type': 'application/json',
});
let isRefreshing = false;
instance.interceptors.request.use(async function (config) {
    // const accessToken = store.getState().user.token;
    const accessToken = await getAccessToken();
    const refreshToken = await getRefreshToken();
    // console.log("accessToken---" + accessToken);
    // console.log("refreshToken---" + refreshToken);
    if (accessToken && config.headers.hasOwnProperty('Authorization'))
        config.headers = {
            ...config.headers,
            'Authorization': `Bearer ${accessToken}`
        };
    return config;
}, function (error) {
    console.log("request---" + error);
    return Promise.reject(error);
});

instance.interceptors.response.use(async function (response) {
    if (response?.data?.status == 0 && response?.data?.message == "JWT_ERROR") {
        console.log("---JWT_ERROR---");
        const refreshToken = await getRefreshToken();
        console.log("refreshToken---" + refreshToken);
        await apiLogOut(refreshToken);
        await deleteUser()
        await deleteToken()
    }
    return response?.data;
}, async function (error) {
    console.log("response---" + error);
    console.log("response status code---" + error.response.status);
    console.log("response config---" + error.config);
    const prevRequest = error?.config;
    if (error.response && error?.response?.status === 401 && !prevRequest?.sent) {
        prevRequest.sent = true;

        if (!isRefreshing) {
            isRefreshing = true;
            try {
                const refreshToken = await getRefreshToken();

                const resp = await apiRefreshToken(refreshToken);

                if (resp?.data?.token) {
                    // store.dispatch(updateToken(resp?.data?.token));
                    saveToken(resp?.data?.token, resp?.data?.refreshToken);
                    // Retry the failed request with the new token
                    prevRequest.headers['Authorization'] = `Bearer ${resp.data.token}`;
                    return instance(prevRequest);
                } else {
                    await deleteToken()

                    await deleteUser();
                }
            } catch (refreshError) {
                console.log("Refresh token request failed:", refreshError);
                await deleteToken()

                await deleteUser();
            } finally {
                isRefreshing = false;
            }
        } else {
            // If another request is already refreshing the token, wait for that request to complete
            await new Promise(resolve => {
                const interval = setInterval(() => {
                    if (!isRefreshing) {
                        clearInterval(interval);
                        resolve();
                    }
                }, 100);
            });
            // Retry the failed request with the new token
            return instance(prevRequest);
        }
    }
    return Promise.reject(error);
});

export default instance;