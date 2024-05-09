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
import { apiResgister } from '../../apis/user';
import { deleteAll, saveToken, saveUser } from '../../storage/AsyncStorage';
import { UserLoginData, useRealm } from '../../models/UserLoginData';

const SignupStep03 = ({ navigation, route }: { navigation: any; route: any; }) => {
    const [showPass, setShowPass] = React.useState(false);
    const [userForm, setUserForm] = React.useState({ ...route.params?.userForm, password: '' });
    const [loading, setLoading] = React.useState(false);
    const realm = useRealm();
    const [error, setError] = React.useState({
        password: '',
        code: ''
    });

    const validate = () => {
        let isValid = true;
        if (userForm.password === '') {
            setError(prevState => ({
                ...prevState,
                password: 'Password is required'
            }));
            isValid = false;
        } else if (userForm.password.length < 8) {
            setError(prevState => ({
                ...prevState,
                password: 'Password must be at least 8 characters'
            }));
            isValid = false;
        } else {
            setError(prevState => ({
                ...prevState,
                password: ''
            }));
        }
        return isValid;
    }

    const deleteAllUserData = () => {
        realm.write(() => {
            realm.deleteAll();
        });
    };
    function addLoginUser(email: string, full_name: string, password: string) {
        deleteAllUserData();

        realm.write(() => {
            const collection = realm.create<UserLoginData>('UserData', {
                email: email,
                fullName: full_name,
                password: password,
            })
            // console.log("----User login 2 ", collection.email);
            // console.log("----User login 2", collection);
        })

        // console.log("----User login 3 ", userData);


    }
    const handleRegister = async () => {
        if (validate()) {
            // call api
            if (loading) return;
            setLoading(true);
            try {
                const res: any = await apiResgister(userForm);
                console.log('res', res);
                if (res?.status === 1) {
                    console.log('login success', res.data?.user);
                    await deleteAll();
                    // console.log('login success', res.data?.user);
                    await addLoginUser(res.data?.user.email, res.data?.user.full_name, userForm.password);
                    await saveUser(res.data?.user);
                    await saveToken(res.data?.token, res.data?.refreshToken, res.data?.user.roles);

                    // navigation.navigate('Dashboard')
                    navigation.reset({
                        routes: [{ name: 'Dashboard' }],
                    })
                    ToastAndroid.showWithGravityAndOffset(
                        'Login success!',
                        ToastAndroid.SHORT,
                        ToastAndroid.TOP,
                        100,
                        200
                    )
                    // navigation.navigate('Dashboard');
                } else {
                    if (res?.message === 'Mã xác nhận Email đã hết hạn.' || res?.message === 'Mã xác nhận Email không hợp lệ') {
                        navigation.navigate('SignupStep02', {
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
                    setError(prevState => ({
                        ...prevState,
                        code: res?.message
                    }));
                }
            } catch (e) {

            }
            setLoading(false);
        }
    }
    // console.log('route.params', route.params?.userForm)
    useEffect(() => {
        console.log('userForm', userForm);
    }, [])
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
                Sign Up Step 3
            </Text>
            <Text className='text-red-300' style={{
                ...FONTS.body3,
                color: COLORS.gray30,
                paddingHorizontal: SIZES.padding,
                marginTop: 10,
            }}>
                Create your Password
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
                    <Text className=''
                        style={{
                            ...FONTS.body4,
                            fontSize: 18,
                            color: COLORS.white
                        }}>{"Congrats! Now enter your password to continue sign up with "}
                        <Text className='underline' style={{ ...FONTS.h2 }}>{userForm.email}</Text>
                    </Text>
                </Text>

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
                            if (value.length > 0)
                                setError(prevState => ({ ...prevState, password: '' }));
                            setUserForm({ ...userForm, password: value })
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
                {error.password !== '' && <Text className='text-red-600 mt-2 ml-2'>{error.password}</Text>}

                <View>
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
                        label='Sign Up'
                        onPress={() => {
                            handleRegister();
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
                        Already have an account?{'  '}
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
                            Login
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default SignupStep03;