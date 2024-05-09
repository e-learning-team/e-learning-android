import React, { useEffect } from 'react';
import { ActivityIndicator, Image, SafeAreaView, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
// const logo = require('../assets/images/logo.png');
// import {} from ';
import { TextInput } from 'react-native-gesture-handler';
import { COLORS, SIZES, FONTS, icons } from '../../constants';
import {
    TextButton
} from '../../components';
import OTPTextView from 'react-native-otp-textinput';
import IconButton from '../../components/IconButton';
import { apiConfirmForgetPassword, apiPasswordConfirmCode } from '../../apis/user';

const ForgetPasswordStep03 = ({ navigation, route }: { navigation: any; route: any; }) => {
    const [showPass, setShowPass] = React.useState(false);
    const [showConfirmPass, setShowConfirmPass] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [userForm, setUserForm] = React.useState({ ...route.params?.userForm, new_password: '', confirm_password: '' });
    // console.log('route.params', route.params?.userForm)
    const [error, setError] = React.useState({
        new_password: '',
        confirm_password: ''
    });
    const validate = () => {
        let isValid = true;
        if (userForm.new_password === '') {
            setError(prevState => ({
                ...prevState,
                new_password: 'Password is required'
            }));
            isValid = false;
        } else if (userForm.new_password.length < 8) {
            setError(prevState => ({
                ...prevState,
                new_password: 'Password must be at least 8 characters'
            }));
            isValid = false;
        }
        if (userForm.confirm_password === '') {
            setError(prevState => ({
                ...prevState,
                confirm_password: 'Confirm Password is required'
            }));
            isValid = false;
        } else if (userForm.confirm_password.length < 8) {
            setError(prevState => ({
                ...prevState,
                confirm_password: 'Password must be at least 8 characters'
            }));
            isValid = false;
        }
        if (userForm.confirm_password.length >= 8 && userForm.new_password !== userForm.confirm_password) {
            setError(prevState => ({
                ...prevState,
                confirm_password: 'Password not match'
            }));
            isValid = false;
        }
        return isValid;
    }
    const handleChangePassword = async () => {
        if (validate()) {
            if (loading) return;

            setLoading(true);
            const res: any = await apiConfirmForgetPassword(userForm);
            console.log('res:', res);
            if (res?.status === 1) {
                // console.log('res:', res);
                navigation.navigate('Login');
            } else {
                if (res?.message) {
                    navigation.navigate('ForgetPasswordStep02', {
                        userForm: userForm
                    });
                    ToastAndroid.showWithGravityAndOffset(
                        'Code is invalid or expired! Please try again!',
                        ToastAndroid.SHORT,
                        ToastAndroid.TOP,
                        100,
                        200
                    )
                }
            }
            setLoading(false);
        }
    }

    useEffect(() => {
        console.log('userForm', userForm)
    }, []);
    return (
        <View className='flex-1'
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
                Reset Password Step 3
            </Text>
            <Text className='text-red-300' style={{
                ...FONTS.body3,
                color: COLORS.gray30,
                paddingHorizontal: SIZES.padding,
                marginTop: 10,
            }}>
                Create your new Password
            </Text>

            <View
                className={`rounded-t-[${SIZES.radius}]  mt-[24] px-[20] py-[20]`}
                style={{
                    flex: 1,
                    marginTop: SIZES.padding,
                    paddingHorizontal: SIZES.padding,
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
                        color: COLORS.white
                    }}>Password</Text>
                <View className=''
                    style={{
                        marginTop: SIZES.base,
                        borderRadius: SIZES.radius,
                        backgroundColor: COLORS.white,
                        borderWidth: 1,
                        borderColor: COLORS.white
                    }}>

                    <TextInput
                        onChangeText={(value) => {
                            if (value.length > 0) {
                                setError(prevState => ({
                                    ...prevState,
                                    new_password: ''
                                }));
                            }
                            setUserForm({ ...userForm, new_password: value })
                        }}
                        className=''
                        placeholder='Enter Your Password'
                        placeholderTextColor={COLORS.gray30}
                        secureTextEntry={!showPass}
                        style={{
                            // backgroundColor: COLORS.gray20,
                            width: '80%',
                            paddingHorizontal: SIZES.radius,
                            height: 50,
                            fontSize: 18,
                        }}
                    />

                    <TouchableOpacity
                        className='absolute'
                        style={{
                            right: 22,
                            // transform: [{ translateY: 30 }]
                            top: 0,
                            bottom: 0,
                            justifyContent: 'center'
                        }}
                        onPress={() => { setShowPass(!showPass); }}>
                        {showPass ? (
                            <Image source={icons.eye} resizeMode='contain' style={{ width: 20, height: 20 }} />
                        ) :
                            <Image source={icons.eye_close} resizeMode='contain' style={{ width: 20, height: 20 }} />
                        }
                    </TouchableOpacity>
                </View>
                {error.new_password !== '' && <Text className='text-red-600 mt-2 ml-2'>{error.new_password}</Text>}

                <Text className=''
                    style={{
                        marginTop: SIZES.padding,
                        ...FONTS.body3,
                        fontSize: 18,
                        color: COLORS.white
                    }}>Confirm Password</Text>
                <View className=''
                    style={{
                        marginTop: SIZES.base,
                        borderRadius: SIZES.radius,
                        backgroundColor: COLORS.white,
                        borderWidth: 1,
                        borderColor: COLORS.white
                    }}>

                    <TextInput
                        onChangeText={(value) => {
                            if (value.length > 0) {
                                setError(prevState => ({
                                    ...prevState,
                                    confirm_password: ''
                                }));
                            }
                            setUserForm({ ...userForm, confirm_password: value })
                        }}
                        className=''
                        placeholder='Repeat your Password'
                        placeholderTextColor={COLORS.gray30}
                        secureTextEntry={!showConfirmPass}
                        style={{
                            // backgroundColor: COLORS.gray20,
                            width: '80%',
                            paddingHorizontal: SIZES.radius,
                            height: 50,
                            fontSize: 18,
                        }}
                    />

                    <TouchableOpacity
                        className='absolute'
                        style={{
                            right: 22,
                            // transform: [{ translateY: 30 }]
                            top: 0,
                            bottom: 0,
                            justifyContent: 'center'
                        }}
                        onPress={() => { setShowConfirmPass(!showConfirmPass); }}>
                        {showConfirmPass ? (
                            <Image source={icons.eye} resizeMode='contain' style={{ width: 20, height: 20 }} />
                        ) :
                            <Image source={icons.eye_close} resizeMode='contain' style={{ width: 20, height: 20 }} />
                        }
                    </TouchableOpacity>
                </View>
                {error.confirm_password !== '' && <Text className='text-red-600 mt-2 ml-2'>{error.confirm_password}</Text>}

                <View className='relative'>
                    {loading && (
                        <ActivityIndicator className='absolute bottom-2 z-10 left-0 right-0' size="large" color="#00ff00" />

                    )}
                    <TextButton
                        customContainerClassName='mt-[50]'
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
                        label='Confirm'
                        onPress={() => {
                            handleChangePassword();
                            // navigation.navigate('Dashboard');
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
                    </Text>
                    <TouchableOpacity
                        className=''
                        onPress={() => {
                            navigation.navigate('Login');
                        }}>
                        <Text
                            className='text-center underline'
                            style={{
                                color: COLORS.white,
                                ...FONTS.h4,
                                fontSize: 16
                            }}>
                            Cancel?
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default ForgetPasswordStep03;