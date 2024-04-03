import React, { useEffect, useState } from 'react';
import { Alert, Image, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
const logo = require('../assets/images/logo.png');
// import {} from ';
import { TextInput } from 'react-native-gesture-handler';
import { COLORS, SIZES, FONTS, icons } from '../constants';
import {
    TextButton
} from '../components';
import { UserLoginData, useQuery, useRealm } from '../models/UserLoginData';
import { BSON } from 'realm';
import { apiLogin } from '../apis/user';
import Spinner from 'react-native-loading-spinner-overlay';
import { deleteAll, saveToken, saveUser } from '../storage/AsyncStorage';
const Login = ({ navigation }: { navigation: any; }) => {
    const [loading, setLoading] = useState(false);
    const [showPass, setShowPass] = React.useState(false);
    const [payload, setPayload] = useState({
        email: '',
        password: ''
    })
    const realm = useRealm();
    const userData = useQuery(UserLoginData);
    const deleteAllUserData = () => {
        realm.write(() => {
            realm.deleteAll();
        });
    };

    async function login() {
        console.log('call api login');
        setLoading(true);
        const res = await apiLogin(payload);
        if (res?.status == 1) {
            deleteAll();
            console.log('login success', res.data?.user);
            addLoginUser(res.data?.user.email, res.data?.user.full_name, payload.password);
            saveUser(res.data?.user);
            saveToken(res.data?.token, res.data?.refreshToken, res.data?.user.roles);
            
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
        } else {
            Alert.alert('Error', 'Login failed! Please try again.', [{ text: 'OK' }]);
        }
        setLoading(false);
    }
    function addLoginUser(email: string, fullName: string, password: string) {
        deleteAllUserData();

        realm.write(() => {
            const collection = realm.create<UserLoginData>('UserData', {
                email: email,
                fullName: fullName,
                password: password,
            })
            // console.log("----User login 2 ", collection.email);
            // console.log("----User login 2", collection);
        })

        // console.log("----User login 3 ", userData);


    }
    return (
        <View className='flex-1 relative'
            style={{
                flex: 1,
                backgroundColor: COLORS.primary
            }}>
            <Text className='' style={{
                ...FONTS.h1,
                paddingHorizontal: SIZES.padding,
                marginTop: 90,
                color: COLORS.white
            }}>
                Login
            </Text>
            <Text className='text-red-300' style={{
                ...FONTS.body3,
                color: COLORS.white,
                paddingHorizontal: SIZES.padding,
                marginTop: 10,
            }}>
                Welcome back to WISDOM E-LEARNING
            </Text>

            <View
                className={`rounded-t-[${SIZES.radius}] bg-white mt-[24] px-[20] py-[20]`}
                style={{
                    flex: 1,
                    marginTop: SIZES.padding,
                    paddingHorizontal: SIZES.padding,
                    backgroundColor: COLORS.white,
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
                        color: COLORS.gray50,

                    }}>Email</Text>
                <View className=''
                    style={{
                        marginTop: SIZES.base,
                        borderRadius: SIZES.radius,
                        backgroundColor: COLORS.white,
                        borderWidth: 1,
                        borderColor: COLORS.gray30
                    }}>

                    <TextInput
                        className=''
                        placeholder='Enter Your Email'
                        placeholderTextColor={COLORS.gray30}
                        style={{
                            paddingHorizontal: SIZES.radius,
                            height: 50,
                            fontSize: 18,
                        }}
                        onChangeText={(value) => setPayload({ ...payload, email: value })}
                    />
                </View>

                <Text className=''
                    style={{
                        marginTop: SIZES.padding,
                        ...FONTS.body3,
                        fontSize: 18,
                        color: COLORS.gray50
                    }}>Password</Text>
                <View className=''
                    style={{
                        marginTop: SIZES.base,
                        borderRadius: SIZES.radius,
                        borderWidth: 1,
                        borderColor: COLORS.gray30
                    }}>

                    <TextInput
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
                        onChangeText={(value) => setPayload({ ...payload, password: value })}
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

                <View className=''>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('ForgetPasswordStep01')}>
                        <Text
                            className={`self-end `}
                            style={{
                                // alignSelf: 'flex-end',
                                color: COLORS.gray30,
                                marginTop: SIZES.base,
                                ...FONTS.body3,
                                fontSize: 16
                            }}>
                            Forgot Password?
                        </Text>
                    </TouchableOpacity>
                </View>

                <TextButton
                    customContainerClassName='mt-[20]'
                    customContainerStyle={{
                        height: 55,
                        borderRadius: SIZES.radius,
                        backgroundColor: COLORS.primary,
                        paddingHorizontal: 10,
                    }}
                    customLabelStyle={{
                        ...FONTS.h3,
                        fontSize: 18
                    }}
                    label='Login'
                    onPress={() => { if (loading) return; login(); }}
                />

                <View className='flex-row items-center justify-center  mt-[20]'>
                    <Text
                        className='text-center'
                        style={{
                            color: COLORS.gray30,
                            ...FONTS.body3,
                            fontSize: 16
                        }}>
                        Don't have an account?{'  '}
                    </Text>
                    <TouchableOpacity
                        className=''
                        onPress={() => navigation.navigate('SignupStep01')}>
                        <Text
                            className='text-center underline'
                            style={{
                                color: COLORS.primary,
                                ...FONTS.body3,
                                fontSize: 16
                            }}>
                            Sign up
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Spinner
                visible={loading}
                textContent={'Loading...'}
                overlayColor='rgba(0, 0, 0, 0.5)'
                textStyle={{ color: COLORS.white }} />
        </View >
    );
};

export default Login;