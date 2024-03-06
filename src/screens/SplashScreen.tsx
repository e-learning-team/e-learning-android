import React, { useEffect } from 'react';
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { useTailwind } from 'nativewind';

import {
  images,
  FONTS,
  COLORS,
  SIZES,
  theme
} from '../constants';
import { TextButton } from '../components';
const SplashScreen = ({ navigation }: { navigation: any; }) => {

  return (
    <SafeAreaView className='bg-white h-full w-full items-center' style={{}}>
      <Image
        style={{}}
        source={images.splash_screen_logo}
        resizeMode='contain'
        className='w-[50%] h-[50%]'
      />
      <Text className='px-[20]' style={{ ...FONTS.h2 }}>
        Welcome to
        <Text className='' style={{ color: COLORS.primary, ...FONTS.h2 }}>
          {' '}
          WISDOM E-LEARNING
        </Text>
      </Text>
      <Text
        className='w-[150]'
        style={{
          marginTop: 50,
          textAlign: 'center',
          color: COLORS.gray40,
          ...FONTS.body3,
        }}>
        Study to gain 1000IQ for your future!!!
      </Text>

      <View className='flex-row mt-[130] px-[20] flex ' style={{ gap: 20 }}>
        <TextButton
          customContainerClassName=''
          customContainerStyle={{
            flex: 1,
            // width: 130,
            height: 50,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.primary,
            paddingHorizontal: 10,
          }}
          customLabelStyle={{
            ...FONTS.body3,
            fontSize: 16
          }}
          label='Sign up'
          onPress={() => navigation.navigate('SignupStep01')}
        />
        <TextButton
          customContainerClassName=''
          customContainerStyle={{
            flex: 1,
            // width: 130,
            height: 50,
            borderRadius: SIZES.radius,
            paddingHorizontal: 10,
            backgroundColor: COLORS.white,
            borderWidth: 1,
            borderColor: COLORS.primary,

          }}
          customLabelStyle={{
            color: COLORS.primary,
            ...FONTS.body3,
            fontSize: 16
          }}
          label='Log in'
          onPress={() => navigation.navigate('Login')}
        />
      </View>

      <TouchableOpacity
        className='mt-[20] '
        onPress={() => navigation.navigate('Dashboard')}>
        <Text
          className='underline'
          style={{
            color: COLORS.gray40,
            ...FONTS.body2,
            fontSize: 17
          }}>
          Not now
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   baseText: {
//     fontSize: 30,
//   },
//   titleText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
// });
export default SplashScreen;
