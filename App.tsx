// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
// import React from 'react';
// import {useTailwind} from 'nativewind';
// export default function App() {
//   return (
//     <View className="flex-1 items-center justify-center bg-slate-400">
//       <Text className='text-amber-700'>Open up App.js to start working ons your app!</Text>
//     </View>
//   );
// }


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import SplashScreen from './src/screens/SplashScreen';
import Home from './src/screens/Home';
import { Text, View } from 'react-native';
const Stack = createStackNavigator();
function App(): React.JSX.Element {
  return (
    // <View className="flex-1 items-center justify-center bg-slate-400">
    //   <Text className='text-amber-700'>Open up App.js to start working ons your app!</Text>
    // </View>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
