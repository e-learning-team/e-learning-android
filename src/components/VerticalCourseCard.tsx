import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import { COLORS, SIZES, FONTS, constants, icons, images } from '../constants';
import  IconLabel  from './IconLabel';

const VerticalCourseCard = ({ containerStyle, course, onPress, navigation }: any) => {
    return (
        <TouchableOpacity
            onPress={()=> {navigation.navigate('CourseDetail', {course: course})}}
            style={{
                width: 270,
                ...containerStyle
            }}>
            <Image
                source={course.image_path ? { uri: course.image_path } : images.featured_bg_image}
                resizeMode='cover'
                style={{
                    width: '100%',
                    height: 150,
                    marginBottom: SIZES.radius,
                    borderRadius: SIZES.radius
                }}
            />
            <View
                className='flex-row'
                style={{
                    flexDirection: 'row',
                }}>

                <View
                    className=''
                    style={{
                        width: 45,
                        height: 45,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 25,
                        backgroundColor: COLORS.primary,
                    }}>
                    <Image
                        source={icons.play}
                        resizeMode='contain'
                        style={{
                            width: 20,
                            height: 20
                        }}
                    />

                </View>
                <View
                    className=''
                    style={{
                        flexShrink: 1,
                        paddingHorizontal: SIZES.radius
                    }}
                >
                    <Text
                        className='text-ellipsis'
                        numberOfLines={2}
                        style={{
                            flex: 1,
                            ...FONTS.h4,
                            fontSize: 18,
                            // height: 45
                        }}>
                        {`${course?.name}`}
                    </Text>

                    {/* <IconLabel
                        icon={icons.time}
                        label={course.duration}
                        containerStyle={{
                            marginTop: SIZES.base,
                        }} /> */}
                </View>
            </View>
        </TouchableOpacity>
    );
};
export default VerticalCourseCard;