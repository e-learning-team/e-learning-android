import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ImageBackground
} from 'react-native';
import IconLabel from './IconLabel';
import { COLORS, SIZES, FONTS, constants, icons, images } from '../constants';
import { extractVideoGoogleGDriveUrlId, getVideoThumbnailGoogleGDriveUrl } from '../utils/helper';

const HorizontalCourseCard = ({ containerStyle, course, onPress }: any) => {
    return (
        <TouchableOpacity
            className='flex-row'
            style={{
                ...containerStyle
            }}>
            <ImageBackground
                source={course.video_path ? { uri: getVideoThumbnailGoogleGDriveUrl(extractVideoGoogleGDriveUrlId(course.video_path)) } : images.featured_bg_image}
                resizeMode='cover'
                style={{
                    width: 130,
                    height: 130,
                    marginBottom: SIZES.radius,
                }}
                imageStyle={{
                    borderRadius: SIZES.radius
                }}>

                {/* <View
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
                </View> */}
            </ImageBackground>

            <View className='justify-between h-[130]' style={{ flex: 1, marginLeft: SIZES.base, }}>
                <Text numberOfLines={2} className='' style={{ ...FONTS.h3, fontSize: 18 }}>
                    {course?.name}
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
                            ...FONTS.h5
                        }}>
                        By {course?.created_user_info[course.created_by]}
                    </Text>

                    {/* <IconLabel
                        icon={icons.time}
                        label={course.total_lesson + ' lessons'}
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
                        }} /> */}

                </View>
                <View className='flex-row items-center'>
                    <IconLabel
                        icon={icons.education}
                        label={course.subscriptions + ' students'}
                        containerStyle={{
                            flex: 1,
                            // marginLeft: SIZES.base,
                        }}
                        iconStyle={{
                            width: 15,
                            height: 15,
                            tintColor: COLORS.black
                        }}
                        lableStyle={{
                            ...FONTS.body4,
                            // color: COLORS.black
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
                            ...FONTS.h3,
                            color: COLORS.primary
                        }}>
                        {/* ${course?.price.toFixed(2)} */}
                        {course.price_sell ? "$" + course.price_sell.toLocaleString() + "" : (<>FREE</>)}

                    </Text>

                    <IconLabel
                        icon={icons.star}
                        label={
                            <>
                                <Text>
                                    {course.course_ratings?.averageRate.toFixed(1)}
                                </Text>
                                {/* <Text className='' style={{...FONTS.body4}}>
                                    {' '}({course.course_ratings?.totalRatings})
                                </Text> */}
                            </>
                        }
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