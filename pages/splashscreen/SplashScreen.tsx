import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
function SplashScreen({navigation}: {navigation: any}): React.JSX.Element {
  useEffect(() => {
    const timeout = setTimeout(() => navigation.navigate('Home'), 10000);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.baseText}> Nguyễn Sỹ Hoàng Lâm - 20110514</Text>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  baseText: {
    fontFamily: 'Cochin',
    fontSize: 30,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
export default SplashScreen;
