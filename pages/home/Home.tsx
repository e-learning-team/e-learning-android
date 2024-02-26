import React from 'react';
import {Image, SafeAreaView, StyleSheet} from 'react-native';
const logo = require('../../assets/logo.png');
function Home(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={logo} />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 'auto',
    height: 300,
  },
});

export default Home;
