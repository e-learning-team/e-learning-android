import React from 'react';
import { Image, ImageBackground, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
const logo = require('../assets/images/logo.png');
// import {} from ';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { COLORS, SIZES, FONTS, constants, icons, images, dummyData } from '../constants';
import {
    IconButton,
    TextButton,
    VerticalCourseCard,
    LineDivider,
    CategoryCard,
    HorizontalCourseCard
} from '../components';

const Login = ({ navigation }: { navigation: any; }) => {
    const [showPass, setShowPass] = React.useState(false);
    return (
        <View className='flex-1'
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
                    <TouchableOpacity>
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
                onPress={() => navigation.navigate('Dashboard')}
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
        </View>
    );
};

export default Login;