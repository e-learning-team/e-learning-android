import axios from "./axios";

export const apiRatingCourse = (data) => axios({
    url: '/rating/',
    method: 'post',
    data,
    headers: {
        'Authorization': ``,
    }
})

export const apiGetUserRating = (courseId, userId) => axios({
    url: `/rating/${courseId}/${userId}`,
    method: 'get',
    // headers: {
    //     'Authorization': ``,
    // }
})