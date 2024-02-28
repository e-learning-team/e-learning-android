import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ImageBackground
} from 'react-native';
import IconLabel from './IconLabel';
import { COLORS, SIZES, FONTS, constants, icons } from '../constants';

const HorizontalCourseCard = ({ containerStyle, course, onPress }: any) => {
    // console.log('HorizontalCourseCard: course: ', course.title);
    return (
        <TouchableOpacity
            className='flex-row'
            style={{
                ...containerStyle
            }}>
            <ImageBackground
                source={course?.thumbnail}
                resizeMode='cover'
                style={{
                    width: 130,
                    height: 130,
                    marginBottom: SIZES.radius,
                }}
                imageStyle={{
                    borderRadius: SIZES.radius
                }}>

                <View
                    className='absolute top-[10] right-[10] w-[30] h-[30]'
                    style={{
                        // top: 10,
                        // right: 10,
                        // width: 30,
                        // height: 30,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 5,
                        backgroundColor: COLORS.white
                    }}
                >
                    <Image
                        className='w-[20] h-[20]'
                        source={icons.favourite}
                        resizeMode='contain'
                        style={{
                            tintColor: course?.is_favourite ? COLORS.secondary : COLORS.additionalColor4
                        }}
                    />
                </View>
            </ImageBackground>

            <View className='justify-between h-[130]' style={{ flex: 1, marginLeft: SIZES.base, }}>
                <Text numberOfLines={3} className='' style={{ ...FONTS.h3, fontSize: 18 }}>
                    {course?.title}
                    {course?.title}
                    {course?.title}
                    {course?.title}
                </Text>

                <View
                    className='flex-row items-center'
                    style={{
                        marginTop: SIZES.base
                    }}>
                    <Text
                        numberOfLines={1}
                        className=''
                        style={{
                            flex: 1,
                            ...FONTS.h4
                        }}>
                        By {course?.instructor}
                        By {course?.instructor}
                        By {course?.instructor}
                    </Text>

                    <IconLabel
                        icon={icons.time}
                        label={course.duration}
                        containerStyle={{
                            flex: 1,
                            marginLeft: SIZES.base,
                        }}
                        iconStyle={{
                            width: 15,
                            height: 15
                        }}
                        lableStyle={{
                            ...FONTS.body4
                        }} />

                </View>
                <View
                    className='flex-row items-center'
                    style={{
                        marginTop: SIZES.base
                    }}>
                    <Text
                        className=''
                        style={{
                            ...FONTS.h2,
                            color: COLORS.primary
                        }}>
                        ${course?.price.toFixed(2)}
                    </Text>

                    <IconLabel
                        icon={icons.star}
                        label={course.ratings}
                        containerStyle={{
                            marginLeft: SIZES.base,
                        }}
                        iconStyle={{
                            width: 15,
                            height: 15,
                            tintColor: COLORS.primary2
                        }}
                        lableStyle={{
                            marginLeft: 5,
                            color: COLORS.black,
                            ...FONTS.h3
                        }} />
                </View>
            </View>

        </TouchableOpacity>
    );
};

export default HorizontalCourseCard;