import React, { useEffect } from 'react';
import { ActivityIndicator, Image, ImageBackground, SafeAreaView, ScrollView, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
// const logo = require('../assets/images/logo.png');
// import {} from ';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { COLORS, SIZES, FONTS, constants, icons, images, dummyData } from '../../constants';
import {
    IconButton,
    TextButton,
    VerticalCourseCard,
    LineDivider,
    CategoryCard,
    HorizontalCourseCard
} from '../../components';
import OTPTextView from 'react-native-otp-textinput';
import { apiConfirmEmailVerification, apiSendEmailVerification } from '../../apis/user';

const SignupStep02 = ({ navigation, route }: { navigation: any; route: any }) => {

    const [userForm, setUserForm] = React.useState({ ...route.params?.userForm, code: '' })
    const [loading, setLoading] = React.useState(false);
    const [countDown, setCountDown] = React.useState(30);
    const [message, setMessage] = React.useState('');
    const [error, setError] = React.useState({
        code: ''
    });
    const handleValidateCode = async () => {
        let valid = true;
        if (loading) return;
        setLoading(true);
        try {
            const res: any = await apiConfirmEmailVerification(route.params?.userForm.email, userForm.code);
            if (res?.status === 1) {
                // return true;
            } else {
                setError(prevState => ({
                    ...prevState,
                    code: res?.message
                }));
                valid = false;
            }
        } catch (e) {
            setLoading(false);
        } finally {
            setLoading(false);
        }
        setLoading(false);
        return valid;
    }
    const validateCode = () => {
        let isValid = true;
        if (userForm.code === '') {
            setError(prevState => ({ ...prevState, code: 'Code is required' }))
            isValid = false;
        } else if (userForm.code.length < 6) {
            setError(prevState => ({ ...prevState, code: 'Code must be 6 characters' }))
            isValid = false;
        } else {
            setError(prevState => ({ ...prevState, code: '' }))
        }
        return isValid;
    }
    const handleConfirmCode = () => {
        if (validateCode()) {
            handleValidateCode().then((res) => {
                if (res === true) {
                    console.log('res', res)
                    navigation.navigate('SignupStep03', { userForm })
                }
            });
            // navigation.navigate('SignupStep03', { userForm })
        }
    }
    const handleResendCode = async () => {
        if (countDown === 0) {
            setCountDown(30);
            setError(prevState => ({ ...prevState, code: '' }));
            if (loading) return;

            setLoading(true);
            const res: any = await apiSendEmailVerification(userForm);
            if (res?.status === 1) {
                // return true;
                setMessage('Code has been resent to your email')
            } else {
                setError(prevState => ({
                    ...prevState,
                    code: res?.message
                }));
            }
            setLoading(false);
        } else {
            ToastAndroid.show("Please wait for 30s to resend code", ToastAndroid.SHORT);
        }
    }
    // console.log('route.params', route.params?.userForm)
    useEffect(() => {
        const interval = setInterval(() => {
            setCountDown(prevSeconds => prevSeconds - 1);
        }, 1000);

        if (countDown === 0) {
            console.log('Đếm ngược đã kết thúc');
            // ToastAndroid.show("Code expried please click resend code", ToastAndroid.LONG);
            setCountDown(0);
            clearInterval(interval);
        }

        return () => {
            clearInterval(interval);
        };
    }, [countDown]);
    return (
        <SafeAreaView className='flex-1 justify-center'
            style={{
                flex: 1,
                backgroundColor: COLORS.white
            }}>
            <Text className='' style={{
                ...FONTS.h1,
                paddingHorizontal: SIZES.padding,
                marginTop: 90,
                color: COLORS.black
            }}>
                Sign Up Step 2
            </Text>
            <Text className='text-red-300' style={{
                ...FONTS.body3,
                color: COLORS.gray30,
                paddingHorizontal: SIZES.padding,
                marginTop: 10,
            }}>
                Verify your Email
            </Text>

            <View
                className={`rounded-t-[${SIZES.radius}]  mt-[24] px-[20] py-[20]`}
                style={{
                    flex: 1,
                    marginTop: SIZES.padding,
                    backgroundColor: COLORS.primary,
                    borderTopEndRadius: SIZES.radius,
                    borderTopLeftRadius: SIZES.radius,
                    borderWidth: 1,
                    borderColor: COLORS.gray10
                }}>

                <Text className=''
                    style={{
                        marginTop: SIZES.padding,
                        ...FONTS.body3,
                        fontSize: 18,
                        color: COLORS.white,

                    }}>
                    Hello{' '}
                    <Text className=''
                        style={{
                            ...FONTS.h2,
                            textDecorationLine: 'underline',
                            fontSize: 18,
                            color: COLORS.white
                        }}>{route.params?.userForm.full_name}</Text>
                </Text>
                <Text className=''
                    style={{
                        ...FONTS.body3,
                        fontSize: 18,
                        color: COLORS.white,

                    }}>
                    Please check your{' '}
                    <Text className=''
                        style={{
                            ...FONTS.h2,
                            textDecorationLine: 'underline',
                            fontSize: 18,
                            color: COLORS.white
                        }}>
                        {/* {route.params?.userForm.email} */}
                        {userForm.email}
                    </Text>
                </Text>


                <OTPTextView
                    handleTextChange={(code: string) => {
                        if (code.length > 0) {
                            setError(prevState => ({ ...prevState, code: '' }))
                        }
                        setUserForm({ ...userForm, code })
                    }}
                    inputCount={6}
                    containerStyle={{
                        marginTop: 20,
                    }}
                    tintColor={COLORS.primary2}
                    offTintColor={'transparent'}
                    textInputStyle={{
                        borderWidth: 1,
                        borderBottomWidth: 1,
                        borderColor: COLORS.primary2,
                        width: 50,
                        height: 50,
                        borderRadius: SIZES.radius,
                        backgroundColor: COLORS.white,
                        ...FONTS.h3,
                    }} />
                {error.code !== '' && <Text className='text-red-600 mt-2 ml-2'>{error.code}</Text>}
                <View className='flex-row justify-between items-center px-[10] mt-[10] '>
                    <Text className='text-white'>
                        Resend code in{' '}
                        <Text className='text-red-600'>{countDown}s</Text>
                    </Text>

                    {countDown === 0 && (
                        <TouchableOpacity
                            onPress={() => { handleResendCode() }}
                            disabled={countDown !== 0}>
                            <Text className='text-white font-semibold underline'>Resend Code</Text>
                        </TouchableOpacity>
                    )}
                    {(message !== '' && countDown !== 0) && <Text className='text-white font-semibold'>{message}</Text>}
                </View>

                <View className='relative'>
                    {loading && (
                        <ActivityIndicator className='absolute bottom-2 z-10 left-0 right-0' size="large" color="#00ff00" />
                    )}
                    <TextButton
                        customContainerClassName='mt-[80]'
                        customContainerStyle={{
                            height: 55,
                            borderRadius: SIZES.radius,
                            backgroundColor: loading ? COLORS.gray20 : COLORS.white,
                            paddingHorizontal: 10,
                        }}
                        customLabelStyle={{
                            ...FONTS.h3,
                            fontSize: 18,
                            color: COLORS.primary
                        }}
                        label='Verify'
                        onPress={() => {
                            handleConfirmCode();
                            // navigation.navigate('SignupStep03', { userForm })
                        }}
                    />
                </View>

                <View className='flex-row items-center justify-center  mt-[20]'>
                    <Text
                        className='text-center'
                        style={{
                            color: COLORS.white,
                            ...FONTS.body3,
                            fontSize: 16
                        }}>
                        Already have an account?{'  '}
                    </Text>
                    <TouchableOpacity
                        className=''
                        onPress={() => navigation.navigate('Login')}>
                        <Text
                            className='text-center underline'
                            style={{
                                color: COLORS.white,
                                ...FONTS.h4,
                                fontSize: 16
                            }}>
                            Login
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default SignupStep02;