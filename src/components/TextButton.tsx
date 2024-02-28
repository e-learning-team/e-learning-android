import React from "react";
import {
    Text,
    TouchableOpacity
} from 'react-native';

import { COLORS, SIZES, FONTS } from '../constants';

const TextButton = ({
    customContainerClassName,
    customContainerStyle,
    disabled,
    label,
    customLabelStyle,
    customLabelClassName,
    onPress }: any) => {
    return (
        <TouchableOpacity
            className={` ${customContainerClassName} `}
            style={{
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.primary,
                // shadow
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.1,
                shadowRadius: 4.65,

                elevation: 3,
                // end shadow
                ...customContainerStyle
            }}
            onPress={onPress}
            disabled={disabled}
        >
            <Text className={` ${customLabelClassName}`} style={{ color: COLORS.white, ...FONTS.h3, ...customLabelStyle }}>{label}</Text>
        </TouchableOpacity>
    );
};
export default TextButton;