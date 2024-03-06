import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
// const logo = require('../assets/images/logo.png');
// import {} from ';
import { TextInput } from 'react-native-gesture-handler';
import { COLORS, SIZES, FONTS } from '../../constants';
import {
    TextButton
} from '../../components';

const ForgetPasswordStep01 = ({ navigation }: { navigation: any; }) => {
    const [userForm, setUserForm] = React.useState({
        email: '',
    });
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
                        onChangeText={(value) => setUserForm({ ...userForm, email: value })}
                        placeholderTextColor={COLORS.gray30}
                        style={{
                            // backgroundColor: COLORS.gray20,
                            width: '80%',
                            paddingHorizontal: SIZES.radius,
                            height: 50,
                            fontSize: 18,
                        }} />
                </View>



                <TextButton
                    customContainerClassName='mt-[80]'
                    customContainerStyle={{
                        height: 55,
                        borderRadius: SIZES.radius,
                        backgroundColor: COLORS.white,
                        paddingHorizontal: 10,
                    }}
                    customLabelStyle={{
                        ...FONTS.h3,
                        fontSize: 18,
                        color: COLORS.primary
                    }}
                    label='Verify Email'
                    onPress={() => navigation.navigate('ForgetPasswordStep02', { userForm })}
                />

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