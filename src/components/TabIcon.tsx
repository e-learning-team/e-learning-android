import { View, Text, Image } from 'react-native';
import React from 'react';
import { COLORS, FONTS } from '../constants';

const TabIcon = ({ focused, icon, label, iconStyle }: any) => {
    return (
        <View className='items-center justify-center ' 
            style={{

            }}>
            <Image source={icon}
                className='w-[25] h-[25]'
                resizeMode='contain' 
                style={{
                    tintColor: focused ? COLORS.white : COLORS.gray70,
                    ...iconStyle
                }}/>
                <Text
                    className=''
                    style={{
                        color: focused ? COLORS.white : COLORS.gray70,
                        ...FONTS.h4
                    }}
                    >{label}</Text>
        </View>
    );
};

export default TabIcon;