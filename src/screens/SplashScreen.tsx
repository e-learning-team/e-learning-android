import React, {useEffect} from 'react';
import {SafeAreaView, Text} from 'react-native';
import {useTailwind} from 'nativewind';
function SplashScreen({navigation}: {navigation: any}): React.JSX.Element {
  useEffect(() => {
    const timeout = setTimeout(() => navigation.navigate('Home'), 10000);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <SafeAreaView className='flex-1 justify-center items-center'>
      <Text className='text-red-600'> Nguyễn Sỹ Hoàng Lâm - 20110514</Text>
    </SafeAreaView>
  );
}
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
