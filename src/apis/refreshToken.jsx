import axios from './axios'
export const apiRefreshToken = (data) => axios({
    url: '/auth/refresh-token/mobile',
    method: 'post',
    data,
    withCredentials: true,
});