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
            <View
                // source={category?.thumbnail ? category?.thumbnail : null}
                // resizeMode="cover"
                style={{
                    height: 150,
                    width: 200,
                    borderRadius: SIZES.radius,
                    paddingVertical: SIZES.padding,
                    paddingHorizontal: SIZES.radius,
                    backgroundColor: COLORS.primary2,
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
            </View>
        </TouchableOpacity>
    )
}

export default CategoryCard;