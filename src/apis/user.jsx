import { logout } from "../store/User/userSlice";
import { store } from "../store/configureStore";
import axios from "./axios";

export const apiResgister = (data) => axios({
    url: '/auth/register/mobile',
    method: 'post',
    data,
    withCredentials: true,
});

export const apiLogin = (data) => axios({
    url: '/auth/login/mobile',
    method: 'post',
    data,
    withCredentials: true,
});

export const apiLogOut = (refreshToken) => axios({
    url: '/auth/logout/mobile',
    method: 'post',
    data: refreshToken,
    withCredentials: true,
});

export const apiSendEmailVerification = (data) => axios({
    url: '/auth/email/verify',
    method: 'post',
    data
})
export const apiConfirmEmailVerification = (email, code) => axios({
    url: `/auth/register/mobile/${email}/${code}`,
    method: 'post',
})

export const apiSendForgetPassword = (data) => axios({
    url: '/user/password/reset',
    method:'post',
    data
})
export const apiPasswordConfirmCode = (email, code) => axios({
    url: `/user/password/reset/mobile/${email}/${code}`,
    method: 'post',
})
export const apiConfirmForgetPassword = (data) => axios({
    url: '/user/password/reset',
    method:'patch',
    data
})

export const apiProfileUpdate = (data) => axios({
    url: '/user/profile/update',
    method: 'patch',
    data,
    headers: {
        'Authorization': ``,
    }
})

export const apiProfileUpdateFullName = (id, full_name) => axios({
    url: `/user/update-full-name/${id}`,
    method: 'put',
    params: { full_name: full_name },
    headers: {
        'Authorization': ``,
    }
})
export const apiProfileUpdatePhoneNumber = (id, phone_number) => axios({
    url: `/user/update-phone-number/${id}`,
    method: 'put',
    params: { phone_number: phone_number },
    headers: {
        'Authorization': ``,
    }
})
export const apiProfileUpdateAddress = (id, address) => axios({
    url: `/user/update-address/${id}`,
    method: 'put',
    params: { address: address },
    headers: {
        'Authorization': ``,
    }
})

export const apiProfileUpdatePassword = (id, data) => axios({
    url: `/user/update-password/${id}`,
    method: 'put',
    data,
    headers: {
        'Authorization': ``,
    }
})
export const apiLecturerRegister = (data) => axios({
    url: '/user/lecturer/register',
    method: 'post',
    data,
    headers: {
        'Authorization': ``,
    }
})
export const apiUserDetail = (userId) => axios({
    url: `/user/detail/${userId}`,
    method: 'get',
    // data,
})

export const apiUserList = (params) => axios({
    url: '/user/',
    method: 'get',
    params,
})

export const apiUpdateStatus = (userId, params) => axios({
    url: `/user/lock/${userId}`,
    method: 'post',
    params,
    headers: {
        'Authorization': ``,
    }
})

export const apiUpdateRoles = (userId, params) => axios( {
    url: `/user/update-roles/${userId}`,
    method: 'put',
    params,
    headers: {
        'Authorization': ``,
    }
})