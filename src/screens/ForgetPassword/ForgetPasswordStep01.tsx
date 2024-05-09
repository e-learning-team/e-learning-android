import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
// const logo = require('../assets/images/logo.png');
// import {} from ';
import { TextInput } from 'react-native-gesture-handler';
import { COLORS, SIZES, FONTS } from '../../constants';
import {
    TextButton
} from '../../components';
import { validateEmail } from '../../utils/helper';
import { apiSendForgetPassword } from '../../apis/user';

const ForgetPasswordStep01 = ({ navigation }: { navigation: any; }) => {
    const [userForm, setUserForm] = React.useState({
        email: '',
    });
    const [error, setError] = React.useState({
        email: ''
    });
    const [loading, setLoading] = React.useState(false);
    const handleSendEmail = async () => {
        let valid = true;
        if (loading) return;
        setLoading(true);
        const res: any = await apiSendForgetPassword(userForm);
        if (res?.status === 1) {

        } else {
            setError(prevState => ({
                ...prevState,
                email: res?.message
            }));
            valid = false;
        }
        setLoading(false);
        return valid;
    }
    const validate = () => {
        let isValid = true;
        if (userForm.email === '') {
            setError(prevState => ({
                ...prevState,
                email: 'Email is required'
            }));
            isValid = false;
        } else {
            if (validateEmail(userForm.email)) {
                setError(prevState => ({
                    ...prevState,
                    email: ''
                }));
            } else {
                setError(prevState => ({
                    ...prevState,
                    email: 'Email is not valid'
                }));
                isValid = false;
            }
        }
        return isValid;
    }
    const handleNextStep = async () => {
        if (validate()) {
            handleSendEmail().then((res) => {
                console.log('res:', res);
                if (res === true) {
                    navigation.navigate('ForgetPasswordStep02', { userForm });
                }
            })
        }
    }
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
                Reset Password Step 1
            </Text>
            <Text className='text-red-300' style={{
                ...FONTS.body3,
                color: COLORS.gray30,
                paddingHorizontal: SIZES.padding,
                marginTop: 10,
            }}>

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
                    }}>Email</Text>
                <View className=''
                    style={{
                        marginTop: SIZES.base,
                        borderRadius: SIZES.radius,
                        backgroundColor: COLORS.white,
                        borderWidth: 1,
                        borderColor: COLORS.white
                    }}>

                    <TextInput
                        className=''
                        placeholder='Enter Your Email Address'
                        onChangeText={(value) => {
                            if (error.email !== '') {
                                setError(prevState => ({
                                    ...prevState,
                                    email: ''
                                }));
                            }
                            setUserForm({ ...userForm, email: value })
                        }}
                        placeholderTextColor={COLORS.gray30}
                        style={{
                            // backgroundColor: COLORS.gray20,
                            width: '80%',
                            paddingHorizontal: SIZES.radius,
                            height: 50,
                            fontSize: 18,
                        }} />
                </View>
                {error.email !== '' && <Text className='text-red-500 mt-2 ml-2'>{error.email}</Text>}
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
                        label='Verify Email'
                        onPress={() => {
                            handleNextStep();
                            // navigation.navigate('ForgetPasswordStep02', { userForm })
                        }}
                    />
                </View>

                <View className='relative flex-row items-center justify-center  mt-[20]'>
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
                            Cancel?
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default ForgetPasswordStep01;