import React from "react";
import {
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import { COLORS, SIZES, FONTS } from '../constants';

const LineDivider = ({ lineStyle, LineClassName }: any) => {
    return (
        <View
            className={` ${lineStyle}`}
            style={{
                height: 2,
                width:'100%',
                backgroundColor: COLORS.gray20,
                ...lineStyle
            }}>
            
        </View>
    )
}

export default LineDivider;