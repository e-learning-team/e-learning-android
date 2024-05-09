import React, { Component, useEffect, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { CourseAccordion, IconButton, LineDivider } from '../components';
import { COLORS, SIZES, icons, FONTS } from '../constants';
import WebView from 'react-native-webview';
import { getUser } from '../storage/AsyncStorage';
import { stringify } from 'uuid';
import { VideoModal } from './CourseDetail';
import VideoPlayer from 'react-native-video-player';
import { extractVideoGoogleGDriveUrlId, getVideoThumbnailGoogleGDriveUrl } from '../utils/helper';

const CourseLearn = ({ navigation, route }: { navigation: any; route: any }) => {
    const [course, setCourse] = useState<any>(route.params.course);
    const [user, setUser] = useState<any>(null);
    const [currentCourse, setCurrentCourse] = useState<any>(null);
    const [videoLoading, setVideoLoading] = useState(true);
    async function getLocalUser() {
        let us = await getUser();
        if (us) {
            setUser(us);
        } else {
            navigation.navigate('CourseDetail', {course: course})
        }
    }
    useEffect(() => {
        getLocalUser();
    }, [])
    // const [url, setUrl] = useState<any>(route.params.url);
    useEffect(() => {
        // console.log('Course:', JSON.stringify(course.children[0].children[0].id, null, 2));
        setCurrentCourse(course.children[0].children[0]);
    }, [course]);

    async function handleClickedCourse(course: any) {
        console.log(course?.id);
        await setVideoLoading(true);
        await setCurrentCourse(course);
    }

    function renderHeader() {
        return (
            <>
                <View className='flex-row h-[] items-center' style={{ padding: SIZES.padding - 10, flexDirection: 'row' }}>
                    <IconButton
                        icon={icons.back}
                        containerStyle={{
                            // backgroundColor: COLORS.primary,
                            // marginLeft: SIZES.padding,
                            // marginTop: SIZES.padding,

                            width: 50,
                            height: 50,
                            borderRadius: 50 / 2,
                            backgroundColor: COLORS.gray10,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        iconStyle={{
                            tintColor: COLORS.black,
                        }}
                        onPress={() => navigation.navigate('CourseDetail', {course: course})}
                    />
                    <Text className=''
                        numberOfLines={2}
                        style={{
                            ...FONTS.h2,
                            paddingHorizontal: SIZES.padding,
                            color: COLORS.black
                        }}>
                        {course.name}
                    </Text>
                </View>
                <LineDivider
                    lineStyle={{
                        width: '100%',
                        height: 1,
                        backgroundColor: COLORS.gray30
                    }} />
            </>
        )
    }
    function renderVideo() {
        return (
            <View className='bg-slate-300'>
                {!videoLoading && (
                    <View className=' absolute h-full top-0 left-0 right-0 bottom-0 justify-center items-center'>
                        <Text className='text-black'>
                            Loading video...
                        </Text>
                    </View>
                )}
                {currentCourse?.video_path && (
                    <VideoPlayer
                        video={{ uri: `https://drive.google.com/uc?export=download&id=${extractVideoGoogleGDriveUrlId(currentCourse?.video_path)}` }}
                        thumbnail={{ uri: getVideoThumbnailGoogleGDriveUrl(extractVideoGoogleGDriveUrlId(currentCourse?.video_path)) }}
                        showDuration={true}
                        // videoWidth={500}
                        controlsTimeout={2000}
                        // disableSeek={true}
                        autoplay={true}
                        onLoad={() => { setVideoLoading(false) }}
                        resizeMode='cover'
                    />
                )}
            </View>
        )
    }
    function renderBody() {
        return (
            <View className='mb-[150]'>
                <View className='mt-[20] px-[20]'>
                    {currentCourse?.name && (
                        <>
                            <Text className='' style={{ ...FONTS.h2, color: COLORS.black }}>
                                {currentCourse?.name}
                            </Text>
                        </>
                    )}
                    <Text className='' style={{ ...FONTS.h2, color: COLORS.black }}>
                        Contents
                    </Text>
                    {course?.children.length > 0 ? (
                        course?.children.map((item: any, index: number) => (
                            <CourseAccordion key={index} course={item} children={item?.children} clickedCourse={handleClickedCourse} />
                        ))
                    ) : (
                        <Text className='mt-[10]' style={{ ...FONTS.body3, color: COLORS.gray80 }}>
                            No contents available
                        </Text>
                    )}
                </View>
            </View>
        )
    }
    return (
        <View className='flex-1 h-full'>
            {renderHeader()}
            <ScrollView className=''>
                {renderVideo()}
                {renderBody()}
            </ScrollView>
        </View>
    )
}
export default CourseLearn