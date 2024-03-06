import React, { Ref, RefObject, useEffect, useRef, useState } from 'react';
import {
    View,
    Animated,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';

import { COLORS, SIZES, FONTS, constants, icons } from '../constants';
import Home from './Home';
import { LineDivider } from '../components';
import { IconButton } from '../components';


const MainLayout = ({ children, tabs }: any) => {



    return (
        <View className='flex-1 '>
            {/* <Text>Main</Text> */}
            <View className='w-full items-center justify-between flex-row h-[80] bg-gray-200'>
                <Text className='mx-[15]' style={{
                    ...FONTS.h2,
                    color: COLORS.black
                }}>
                    {tabs === 'Home' ? 'Crypto' : ''}
                </Text>

                <View className='flex-row'>
                    <IconButton
                        icon={icons.search}
                        containerStyle={{
                            // backgroundColor: COLORS.primary,
                            width: 50,
                            height: 50,
                            borderRadius: 50 / 2,
                            backgroundColor: COLORS.gray10,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderColor: COLORS.primary,
                            borderWidth: 1
                        }}
                        iconStyle={{
                            width: 20,
                            height: 20,
                            tintColor: COLORS.primary,
                        }}
                    // onPress={() => navigation.goBack()}
                    />
                    <IconButton
                        icon={icons.profile}
                        containerStyle={{
                            marginHorizontal: SIZES.padding,
                            width: 50,
                            height: 50,
                            borderRadius: 50 / 2,
                            backgroundColor: COLORS.primary2,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        iconStyle={{
                            tintColor: COLORS.primary,
                        }}
                    // onPress={() => navigation.goBack()}
                    />
                </View>
            </View>
            <LineDivider />
            {children}
        </View>
    );

};

export default MainLayout;