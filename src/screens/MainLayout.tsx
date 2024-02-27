import React, { Ref, RefObject, useEffect, useRef, useState } from 'react';
import {
    View,
    Animated,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';
import { Shadow } from 'react-native-shadow-2';


import { COLORS, SIZES, FONTS, constants } from '../constants';
import Home from './Home';
import Search from './Search';
import Profile from './Profile';

const bottom_tabs = constants.bottom_tabs.map((tab) => ({
    ...tab,
    ref: React.createRef<any>()
}));
const TabIndicator = ({ measureLayout, scrollX }: any) => {
    const inputRange = bottom_tabs.map((_, index) => index * SIZES.width);
    const tabIndicatorWidth = scrollX.interpolate({
        inputRange,
        outputRange: measureLayout.map((measure: any) => measure.width)
    });
    const translateX = scrollX.interpolate({
        inputRange,
        outputRange: measureLayout.map((measure: any) => measure.width)
    });
    return (
        <Animated.View className={``}
            style={{
                width: tabIndicatorWidth,
                backgroundColor: COLORS.primary,
                borderRadius: SIZES.radius,
                position: 'absolute',
                left: 0,
                height: '100%',
                transform: [{
                    translateX
                }]
            }}>

        </Animated.View>
    );
};
const Tab = ({ scrollX }: any) => {
    const [measures, setMeasures] = useState<{ x: number; y: number; width: number; height: number; }[]>([]);
    const containerRef = useRef<View>(null);

    React.useEffect(() => {
        const ml: { x: number; y: number; width: number; height: number; }[] = [];

        bottom_tabs.forEach((item) => {
            item.ref.current.measureLayout(
                containerRef.current,
                (x: number, y: number, width: number, height: number) => {
                    ml.push({ x, y, width, height });
                    if (ml.length === bottom_tabs.length) {
                        setMeasures(ml);
                    }
                }
            );
        });
        // console.log('measures', measures.length);
    }, [containerRef.current]);
    return (
        <View className='flex-row'
            ref={containerRef as any}
            style={{
                flex: 1,
                flexDirection: 'row',

            }}
        >

            {measures.length > 0 ? <TabIndicator measureLayout={measures} scrollX={scrollX} /> : null}

            {bottom_tabs.map((item, index) => {
                return (
                    <TouchableOpacity
                        className=''
                        key={`Bottom-${index}`}
                        ref={item.ref}
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            paddingHorizontal: 15,
                            justifyContent: 'center'
                        }}>
                        <Image
                            source={item.icon}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                            }}
                        />
                        <Text className='text-white font-semibold'
                            style={{
                                marginTop: 4,
                                height: 25,
                                // color: COLORS.white,
                                ...FONTS.h4
                            }}>
                            {item.label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};
const MainLayout = () => {
    const flatListRef = React.useRef(null);
    const scrollX = React.useRef(new Animated.Value(0)).current;
    function renderContent() {
        return (
            <View className='flex-1'>
                <Animated.FlatList
                    ref={flatListRef}
                    horizontal
                    pagingEnabled
                    snapToAlignment={'center'}
                    snapToInterval={SIZES.width}
                    decelerationRate={'fast'}
                    showsHorizontalScrollIndicator={false}
                    data={constants.bottom_tabs}
                    keyExtractor={item => `Main-${item.id}`}
                    onScroll={
                        Animated.event([
                            { nativeEvent: { contentOffset: { x: scrollX } } }
                        ], { useNativeDriver: false })
                    }
                    renderItem={({ item, index }) => {
                        return (
                            <View style={{
                                height: SIZES.height,
                                width: SIZES.width
                            }}>
                                {item.label == constants.screens.home ? <Home /> : null}
                                {item.label == constants.screens.search ? <Search /> : null}
                                {item.label == constants.screens.profile ? <Profile /> : null}
                            </View>
                        );
                    }}
                />
            </View>
        );
    }

    function renderBottomTab() {
        return (
            <View
                style={{
                    height: 80,
                    marginBottom: 15,
                    paddingHorizontal: 15,
                    // paddingVertical: 
                }}>
                <View className='' style={{ flex: 1, backgroundColor: COLORS.primary3, borderRadius: SIZES.radius }}>
                    <Tab scrollX={scrollX} />
                </View>
            </View>
        );
    }

    return (
        <View className='flex-1 bg-white'>
            {renderContent()}
            {renderBottomTab()}
        </View>
    );
};

export default MainLayout;