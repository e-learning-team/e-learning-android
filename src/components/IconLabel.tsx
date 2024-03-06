import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import { COLORS, SIZES, FONTS, constants } from '../constants';

const IconLabel = ({
    containerStyle, icon, iconStyle, label, lableStyle, onPress }: any) => {
    return (
        <View
            className='flex-row items-center'
            style={{
                // flexDirection: 'row',
                // alignItems: 'center',
                ...containerStyle
            }}>

            <Image
                source={icon}
                // resizeMode='contain'
                style={{
                    width: 20,
                    height: 20,
                    tintColor: COLORS.gray30,
                    ...iconStyle
                }} />

            <Text
                className=''
                style={{
                    marginLeft: SIZES.base,
                    color: COLORS.gray30,
                    ...FONTS.body3,
                    ...lableStyle
                }}>
                    {label}
            </Text>
        </View>
    );
};
export default IconLabel;