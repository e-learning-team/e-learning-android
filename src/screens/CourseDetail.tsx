import React, { useEffect, useState } from 'react';
import { Alert, Image, ImageBackground, Modal, Text, ToastAndroid, TouchableOpacity, TouchableOpacityBase, TouchableWithoutFeedback, View } from 'react-native';
const logo = require('../assets/images/logo.png');
// import {} from ';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { COLORS, SIZES, FONTS, icons, images } from '../constants';
import {
    CourseAccordion,
    IconButton,
    IconLabel,
    LineDivider,
    TextButton
} from '../components';
import { UserLoginData, useQuery, useRealm } from '../models/UserLoginData';
import { BSON } from 'realm';
import { apiLogin } from '../apis/user';
import Spinner from 'react-native-loading-spinner-overlay';
import { deleteAll, getUser, saveToken, saveUser } from '../storage/AsyncStorage';
import { extractVideoGoogleGDriveUrlId, formatTimeStampTo_DDMMYYY, getVideoThumbnailGoogleGDriveUrl } from '../utils/helper';
import { Rating } from 'react-native-ratings';
import { apiGetCourse } from '../apis/course';
import { ListItem } from '@rneui/themed';
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-player';
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { apiCheckEnrollment } from '../apis/enrollment';
import { apiGetPaymentUrl } from '../apis/invoice';
import { WebView } from 'react-native-webview';
import { Linking } from 'react-native';

const VideoModal = ({ title, source, visible, onPress }: { title: string, source: string, visible: boolean, onPress: any }) => {
    const [showModal, setShowModal] = useState(visible);
    const [videoLoading, setVideoLoading] = useState(true);
    useEffect(() => {
        setShowModal(visible);
    }, [visible]);
    const handleShow = () => {
        setShowModal(!showModal);
        onPress(!showModal);
    }
    return (
        <View className='' style={{}} >
            <Modal
                animationType='fade'
                visible={showModal}
                onDismiss={() => handleShow()}
                transparent={true}
                onRequestClose={() => {
                    handleShow()
                }}>
                <TouchableWithoutFeedback onPress={() => handleShow()}>
                    <View style={{ flex: 1, backgroundColor: COLORS.transparentBlack7 }} />
                </TouchableWithoutFeedback>
                <View className='' style={{
                    position: 'absolute',
                    width: '90%',
                    // height: '90%',
                    right: '5%',
                    // left: '5%',
                    top: '25%',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <View className={`w-full h-full  items-center`} style={{
                        backgroundColor: COLORS.additionalColor9,
                        borderTopLeftRadius: SIZES.radius,
                        borderTopRightRadius: SIZES.radius,
                    }}>
                        <View className="flex-row p-[20]">
                            <View className="w-full flex-row justify-between items-center" style={{}}>
                                <Text className="" style={{ flex: 1, ...FONTS.h3, color: COLORS.black }}>
                                    Course Preview: {title}
                                </Text>
                                {/* <TouchableOpacity onPress={() => handleShow()} className=''>
                                    <View style={{}} className=' px-[20]'>
                                        <Image className='w-[25] h-[25]' source={icons.close} style={{ tintColor: '#f87171' }} />
                                    </View>
                                </TouchableOpacity> */}
                            </View>
                        </View>
                        <LineDivider
                            lineStyle={{
                                width: '100%',
                                height: 1,
                                backgroundColor: COLORS.gray30,
                                marginVertical: 10
                            }} />
                        {!videoLoading && (
                            <View className=' absolute h-full top-0 left-0 right-0 bottom-0 justify-center items-center'>
                                <Text className='text-black'>
                                    Loading video...
                                </Text>
                            </View>
                        )}
                        <View className='w-full h-full'>
                            <VideoPlayer
                                video={{ uri: `https://drive.google.com/uc?export=download&id=${extractVideoGoogleGDriveUrlId(source)}` }}
                                thumbnail={{ uri: getVideoThumbnailGoogleGDriveUrl(extractVideoGoogleGDriveUrlId(source)) }}
                                showDuration={true}
                                // videoWidth={500}
                                controlsTimeout={2000}
                                // disableSeek={true}
                                autoplay={true}
                                onLoad={() => { setVideoLoading(false) }}
                                resizeMode='cover'
                            />
                        </View>
                        {/* <Video
                            source={{ uri: `https://drive.google.com/uc?export=download&id=${extractVideoGoogleGDriveUrlId(source)}` }}
                            className=''
                            // video={{ uri: `https://drive.google.com/uc?export=download&id=${extractVideoGoogleGDriveUrlId(source)}` }}
                            // videoWidth={2000}
                            // videoHeight={2000}
                            // thumbnail={{ uri: getVideoThumbnailGoogleGDriveUrl(extractVideoGoogleGDriveUrlId(source)) }}
                            // fullscreen={true}
                            // showDuration={true}
                            // disableFullscreen={false}
                            // fullScreenOnLongPress={true}
                            style={{
                                width: '100%',
                                height: 200,
                            }}
                            fullscreen={true}
                            controls={true}
                            resizeMode='cover'
                            onLoad={() => { setVideoLoading(false) }}
                        /> */}

                    </View>
                </View>
            </Modal>
        </View>
    )
}

const CourseDetail = ({ navigation, route }: { navigation: any; route: any }) => {
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [course, setCourse] = useState<any>(route.params.course);
    const { width, height } = useWindowDimensions();
    const [user, setUser] = useState<any>(null);
    const [checkEnroll, setCheckEnroll] = useState(false);
    const [checkOutURL, setCheckOutURL] = useState<any>('');
    async function loadCourseDetail() {
        setLoading(true);
        try {
            const response = await apiGetCourse({ slug: course.slug, build_child: true });
            // console.log('response:', JSON.stringify(response, null, 2));
            if (response?.data?.data[0]) {
                setCourse(response?.data?.data[0]);

            } else {
                ToastAndroid.show('Failed to load course detail', ToastAndroid.SHORT);
            }
        } catch (error) {
            console.log('error:', error);
            ToastAndroid.show('Failed to load course detail', ToastAndroid.SHORT);
        }
        setLoading(false);
    }

    async function loadUser() {
        let u = await getUser();
        if (u) {
            setUser(u);
        }
    }
    async function checkUserEnrollment(courseId: String) {
        // console.log('checkUserEnrollment:', courseId);
        if (courseId) {
            const res = await apiCheckEnrollment(courseId);
            // console.log('checkUserEnrollment:', JSON.stringify(res, null, 2));
            if (res && res.data) {
                setCheckEnroll(res.data);
            }
        }
    }
    const handleEnroll = async () => {
        if (!user) {
            ToastAndroid.show('Please Login first please!!', ToastAndroid.SHORT);
            return;
        }

        const data = {
            user_id: user.id,
            course_id: course.id,
        }
        if (course.price_sell > 0) {
            const res = await apiGetPaymentUrl(data.course_id, data.user_id)
            if (res?.status === 0) {
                ToastAndroid.show('Failed to get payment url', ToastAndroid.SHORT);
            } else {
                console.log('res:', res.toString());
                navigation.navigate('CheckOut', { course: course, url: res.toString() });
                // setCheckOutURL(res)
                // const supported = await Linking.canOpenURL(res.toString());
                // console.log('supported:', supported)
                // if (supported) {
                //     await Linking.openURL(res.toString());
                // }
            }
        }
        // console.log('data:', data);
    }
    useEffect(() => {
        loadCourseDetail();
    }, []);
    useEffect(() => {
        loadUser();
    }, []);
    useEffect(() => {
        if (user) {
            checkUserEnrollment(course.id)
        }
    }, [user]);
    useEffect(() => {
        if (course) {
            // console.log('response:', JSON.stringify(course, null, 2));
        } else {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
            })
        }
    }, [course]);
    function renderHeader() {
        return (
            <>
                <View className='flex-row items-center' style={{ padding: SIZES.padding, flexDirection: 'row' }}>
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
                        onPress={() => navigation.goBack()}
                    />
                    <Text className='' style={{
                        ...FONTS.h2,
                        paddingHorizontal: SIZES.padding,
                        color: COLORS.black
                    }}>
                        Course Detail
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
    function renderBody() {
        return (
            <View className='flex-1 mt-[10] bg-white' style={{ paddingHorizontal: 10 }}>
                <ScrollView className='mb-[120]'>
                    <View className='flex-row w-full'>
                        <ImageBackground
                            className='relative'
                            source={course.image_path ? { uri: course.image_path } : images.featured_bg_image}
                            resizeMode='cover'
                            style={{
                                width: '100%',
                                height: 200,
                                marginBottom: SIZES.radius,
                            }}
                            imageStyle={{
                            }}>
                            {course?.video_path ? (
                                <TouchableOpacity
                                    onPress={() => {
                                        setShowModal(true);
                                    }}
                                    className='w-full h-full'>
                                    <View className='absolute top-0 left-0 right-0 bottom-0 justify-center items-center opacity-40' style={{ backgroundColor: 'black' }}>
                                    </View>
                                    <View className='absolute top-0 left-0 right-0 bottom-0 justify-center items-center'>
                                        <Image
                                            source={icons.play_1}
                                            resizeMode='contain'
                                            style={{
                                                width: 60,
                                                height: 60,
                                            }} />
                                        <Text className='absolute bottom-3 text-white' style={{ ...FONTS.h3, color: COLORS.white }}>
                                            Preview this course
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            ) : (
                                <View className='absolute bottom-3 text-white right-0 left-0 justify-center items-center'>
                                    <Text style={{ ...FONTS.h3, color: COLORS.white }}>
                                        No preview available
                                    </Text>
                                </View>
                            )}

                        </ImageBackground>
                    </View>

                    <View className='' style={{ paddingHorizontal: 20 }}>
                        <Text className='' style={{ ...FONTS.h2, color: COLORS.black, }}>
                            {course.name}
                        </Text>
                        <View className='flex-row items-center'>
                            <Text className='mr-[5]'
                                style={{
                                    color: "#f1c40f",
                                    ...FONTS.h2
                                }} >
                                {course.course_ratings?.averageRate.toFixed(1)}
                            </Text>
                            <Rating
                                type='custom'
                                startingValue={course.course_ratings?.averageRate.toFixed(1)}
                                ratingBackgroundColor={COLORS.gray20}
                                // ratingColor='f1c40f'
                                readonly={true}
                                ratingCount={5}
                                imageSize={22}
                                jumpValue={0.5}
                                fractions={1}
                                showRating={false}
                            />
                            <Text className='ml-[5]' style={{ ...FONTS.body3, color: COLORS.gray80 }}>
                                ({course.course_ratings?.totalRatings} {course.course_ratings?.totalRatings > 1 ? 'ratings' : 'rating'})
                            </Text>

                        </View>
                        <Text className='mt-[5]' style={{ ...FONTS.body3, color: COLORS.gray80 }}>
                            Created By {''}
                            <Text className='underline' style={{ color: COLORS.primary }}>
                                {course.created_user_info[course.created_by]}
                            </Text>
                        </Text>
                        <IconLabel
                            containerStyle={{ marginTop: 10, }}
                            iconStyle={{ tintColor: COLORS.gray80, }}
                            lableStyle={{ ...FONTS.body3, color: COLORS.gray80, }}
                            icon={icons.users}
                            label={(course.subscriptions ?? 0) + (course.subscriptions > 1 ? ' students' : ' student')}
                        />
                        <IconLabel
                            containerStyle={{ marginTop: 10, }}
                            iconStyle={{ tintColor: COLORS.gray80, }}
                            lableStyle={{ ...FONTS.body3, color: COLORS.gray80, }}
                            icon={icons.education}
                            label={course.total_lesson + ' lessons'}
                        />
                        <IconLabel
                            containerStyle={{ marginTop: 10, }}
                            iconStyle={{ tintColor: COLORS.gray80, }}
                            lableStyle={{ ...FONTS.body3, color: COLORS.gray80 }}
                            icon={icons.last_update}
                            label={'Last updated ' + formatTimeStampTo_DDMMYYY(course.update_at)}
                        />
                    </View>
                    <View className='mt-[20] px-[20]'>
                        <Text className='' style={{ ...FONTS.h2, color: COLORS.black }}>
                            Contents
                        </Text>
                        {course?.children.length > 0 ? (
                            course?.children.map((item: any, index: number) => (
                                <CourseAccordion key={index} course={item} children={item?.children} />
                            ))
                        ) : (
                            <Text className='mt-[10]' style={{ ...FONTS.body3, color: COLORS.gray80 }}>
                                No contents available
                            </Text>
                        )}
                    </View>
                    <View className='mt-[20] px-[20]'>
                        <Text className='' style={{ ...FONTS.h2, color: COLORS.black }}>
                            Description
                        </Text>
                        <Text className='mt-[10]' style={{ ...FONTS.body3, color: COLORS.gray80 }}>
                            {course.description ? (
                                <RenderHtml
                                    contentWidth={width}
                                    source={{ html: course.description }}
                                />
                            ) : 'No description available'}
                        </Text>
                    </View>
                    <View className='mt-[20] px-[20]'>
                        <Text className='' style={{ ...FONTS.h2, color: COLORS.black }}>
                            Requirements
                        </Text>
                        <Text className='mt-[10]' style={{ ...FONTS.body3, color: COLORS.gray80 }}>
                            {course.requirement ? (
                                <RenderHtml
                                    contentWidth={width}
                                    source={{ html: course.requirement }}
                                />
                            ) : 'No requirements available'}
                        </Text>
                    </View>
                </ScrollView>
            </View>
        )
    }

    function renderFooter() {
        return (
            <View className='absolute bottom-0 w-full bg-[#f2f2f2]'>
                <LineDivider
                    lineStyle={{
                        width: '100%',
                        height: 1,
                        color: COLORS.gray30,
                    }} />
                <View className='flex-row items-center' style={{ padding: SIZES.padding, }}>
                    {checkEnroll ? (
                        <View className='flex-1'>
                            <TextButton
                                label='Learn Now'
                                customContainerStyle={{
                                    height: 60,
                                    flex: 3,
                                    borderRadius: SIZES.radius,
                                    backgroundColor: COLORS.primary
                                }}
                                onPress={() => {
                                    console.log('Learn Now')
                                }}
                            />
                        </View>

                    ) : (
                        <>
                            <View className=' mx-[20] mr-[30]' style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <View>
                                    <Text className='' style={{
                                        ...FONTS.h2,
                                        color: COLORS.primary,
                                    }}>
                                        {course?.price_sell > 0 ? `$ ${course?.price_sell.toLocaleString()}` : 'Free'}
                                    </Text>

                                    {(course?.attributes && course?.attributes[0]?.attributeValue) && (
                                        <Text className='' style={{
                                            ...FONTS.body3,
                                            color: COLORS.gray70,
                                            textDecorationLine: 'line-through'
                                        }}>
                                            {course?.attributes[0]?.attributeValue !== 0 ? `$ ${course?.attributes[0]?.attributeValue.toLocaleString()}` : ''}
                                        </Text>
                                    )}
                                </View>
                            </View>
                            <TextButton
                                label='Enroll Now'
                                customContainerStyle={{
                                    height: 60,
                                    flex: 3,
                                    borderRadius: SIZES.radius,
                                    backgroundColor: COLORS.primary
                                }}
                                onPress={() => {
                                    handleEnroll()
                                }}
                            />
                        </>
                    )}
                </View>
            </View>
        )
    }
    const renderModal = () => {
        return (
            <>
                {course?.video_path ? (
                    <VideoModal
                        title={course?.name}
                        source={course?.video_path}
                        visible={showModal}
                        onPress={() => {
                            setShowModal(!showModal);
                        }}
                    />) : null}
            </>
        )

    }
    return (
        <View className='relative flex-1'>
            {renderHeader()}
            {renderBody()}
            {renderFooter()}

            {renderModal()}
        </View>
    )
};

export default CourseDetail;