import React from "react";
import {
    Text,
    TouchableOpacity,
    View,
    ImageBackground
} from 'react-native';

import { COLORS, SIZES, FONTS } from '../constants';

const CategoryCard = ({ containerStyle, category, onPress }: any) => {
    return(
        <TouchableOpacity>
            <ImageBackground
                source={category?.thumbnail}
                resizeMode="cover"
                style={{
                    height: 150,
                    width: 200,
                    paddingVertical: SIZES.padding,
                    paddingHorizontal: SIZES.radius,
                    justifyContent: 'flex-end',
                    ...containerStyle
                }}
                >
                <Text
                    className=""
                    style={{
                        color: COLORS.white,
                        ...FONTS.h2
                    }}>
                        {category?.title}
                </Text>
            </ImageBackground>
        </TouchableOpacity>
    )
}

export default CategoryCard;