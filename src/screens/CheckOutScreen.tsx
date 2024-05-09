import React, { Component, useEffect, useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { IconButton, LineDivider } from '../components';
import { COLORS, SIZES, icons, FONTS, images } from '../constants';
import WebView from 'react-native-webview';
import { apiCreatePayment } from '../apis/invoice';

const CheckOutScreen = ({ navigation, route }: { navigation: any; route: any }) => {
    const [course, setCourse] = useState<any>(route.params.course);
    const [url, setUrl] = useState<any>(route.params.url);
    const [userData, setUserData] = useState<any>(route.params.user);
    const [errorInfo, setErrorInfo] = useState<any>(null);
    const [vnp_ResponseCode, setVnp_ResponseCode] = useState<any>(null);
    const [vnp_Amount, setVnp_Amount] = useState<any>(null);
    // const [searchParams, setSearchParams] = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<any>("");
    const createPayment = async (vnp_ResponseCode: any, vnp_Amount: any) => {
        setLoading(true);
        if (vnp_ResponseCode === '00') {
            const data = {
                courseId: course.id,
                customerId: userData.id,
                pricePurchase: vnp_Amount / 100,
                createdBy: userData.id
            };
            const resp = await apiCreatePayment(data);
            if (resp.status !== 0) {
                setMessage("Payment success");
                // toast.success('Thanh toán thành công');
                // console.log(`/courses/learn/${course_payment}`);
                // navigate(`/courses/learn/${course_payment}`);
            } else {
                setMessage('Payment failed');
                //setMessage('Đã xảy ra lỗi trong quá trình thanh toán\nvui lòng liên hệ quản trị viên để được hỗ trợ');
                // navigate(`/courses/${course_payment}`);
            }
        } else {
            setMessage('Payment failed');
            // toast.error('Thanh toán thất bại');
            // navigate('/');
        }
        setLoading(false);
    };
    useEffect(() => {
        console.log('Course:', course?.id);
        console.log('User:', userData?.id);
        console.log('Url:', url);
    }, [course, url]);
    useEffect(() => {
        console.log('Error:', errorInfo?.url);
        if (errorInfo?.url) {
            const queryString = errorInfo?.url.split('?')[1];
            const queryParams = queryString.split('&');
            const params: any = {};
            queryParams.forEach((param: any) => {
                const [key, value] = param.split('=');
                params[key] = decodeURIComponent(value);
            });
            const vnp_Response = params['vnp_ResponseCode'];
            const amount = params['vnp_Amount'];
            // setVnp_ResponseCode(vnp_Response);
            // setVnp_Amount(amount);
            createPayment(vnp_Response, amount);
        }
    }, [errorInfo]);

    // useEffect(() => {
    //     console.log('Response:', vnp_ResponseCode);
    //     console.log('Amount:', vnp_Amount);
    // }, [vnp_ResponseCode]);
    function renderHeader() {
        return (
            <>
                <View className='flex-row h-[] items-center' style={{ padding: SIZES.padding - 10, flexDirection: 'row' }}>
                    <IconButton
                        icon={icons.back}
                        containerStyle={{
                            // backgroundColor: COLORS.primary,
                            // marginLeft: SIZES.padding,
                            // marginTop: SIZES.padding,

                            width: 50,
                            height: 50,
                            borderRadius: 50 / 2,
                            backgroundColor: COLORS.gray10,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        iconStyle={{
                            tintColor: COLORS.black,
                        }}
                        onPress={() => navigation.goBack()}
                    />
                    <Text className='' style={{
                        ...FONTS.h2,
                        paddingHorizontal: SIZES.padding,
                        color: COLORS.black
                    }}>
                        Course Payment
                    </Text>
                </View>
                <LineDivider
                    lineStyle={{
                        width: '100%',
                        height: 1,
                        backgroundColor: COLORS.gray30
                    }} />
            </>
        )
    }
    return (
        <View className='flex-1 h-full bg-white'>
            <View>

                {(message !== "Payment success") && renderHeader()}
            </View>
            {(url && !errorInfo) ? (
                // <WebView
                //     className=''

                //     source={{ uri: url }}
                //     style={{ flex: 1 }}
                // />
                <WebView source={{ uri: url }} style={{ flex: 1 }}
                    onError={(syntheticEvent) => {
                        const { nativeEvent } = syntheticEvent;
                        setErrorInfo(nativeEvent);
                    }}
                />
            ) : (
                <View className='flex-1 m-auto h-full mt-[40%]'>
                    {loading ? (
                        <Text className='font-bold text-lg text-blue-500'>Payment Processing...</Text>
                    ) : (
                        <>
                            {message === "Payment success" ? (
                                <View className='items-center'>
                                    <View className='flex-row gap-4'>
                                        <TouchableOpacity
                                            onPress={() => navigation.navigate('CourseLearn', { course: course })}
                                            className=' bg-[#22c55ecc] rounded-md p-4 mb-4'>
                                            <Text className='font-bold text-white'>Learn now</Text>
                                        </TouchableOpacity>
                                        {/* onPress={() => navigation.reset({
                                            routes: [{ name: 'CourseDetail', params: { course: course } }]
                                        })} */}
                                        <TouchableOpacity
                                            onPress={() => navigation.navigate('CourseDetail', { course: course })}
                                            className=' border border-gray-300 rounded-md p-4 mb-4'>
                                            <Text className='font-bold text-[#22c55ecc]'>Back to detail</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View className='flex flex-row justify-center' >
                                        <Text className='font-bold text-lg text-green-500'>{message}</Text>
                                        <Image source={icons.verified} style={{ width: 30, height: 30, resizeMode: 'contain', tintColor: '#22c55e' }} />
                                    </View>
                                    <Image source={images.payment_success_png} style={{ width: 400, height: 400, resizeMode: 'contain' }} />
                                </View>
                            ) : (
                                <>
                                    <View className='flex flex-row justify-center'>
                                        <Text className='font-bold text-lg text-red-500'>{message}</Text>
                                        <Image source={icons.unverified_jpg} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
                                    </View>
                                    <Image source={images.payment_failed_png} style={{ width: 400, height: 400, resizeMode: 'contain' }} />

                                </>
                            )}
                        </>
                    )}
                </View>
            )}




        </View>
    )
}
export default CheckOutScreen