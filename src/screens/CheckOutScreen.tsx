import React, { Component, useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { IconButton, LineDivider } from '../components';
import { COLORS, SIZES, icons, FONTS } from '../constants';
import WebView from 'react-native-webview';

const CheckOutScreen = ({ navigation, route }: { navigation: any; route: any }) => {
    const [course, setCourse] = useState<any>(route.params.course);
    const [url, setUrl] = useState<any>(route.params.url);
    useEffect(() => {
        console.log('Course:', course);
        console.log('Url:', url);
    }, [course, url]);

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
                        onPress={() => navigation.goBack()}
                    />
                    <Text className='' style={{
                        ...FONTS.h2,
                        paddingHorizontal: SIZES.padding,
                        color: COLORS.black
                    }}>
                        Course Payment
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
    return (
        <>
            <View>
                {renderHeader()}
            </View>
            {url && (
                <WebView
                    className=''
                    source={{ uri: url }}
                    style={{ flex: 1 }}
                />
            )}
        </>
    )
}
export default CheckOutScreen