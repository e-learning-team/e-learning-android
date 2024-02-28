import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import { COLORS, SIZES, FONTS, constants } from '../constants';

const IconButton = ({ containerStyle, icon, iconStyle, onPress }: any) => {
    return (
        <TouchableOpacity
            style={{
                ...containerStyle
            }}
            onPress={onPress}
        >
            <Image
                source={icon}
                resizeMode='contain'
                style={{
                    width: 25,
                    height: 25,
                    tintColor: COLORS.white,
                    ...iconStyle
                }}
            />
        </TouchableOpacity>
    );
}
export default IconButton;