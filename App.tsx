// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.tsx to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Text, View } from 'react-native';
import {
    MainLayout,
    Home,
    SplashScreen,
    Login,
    SignupStep01,
    SignupStep02,
    SignupStep03,
} from './src/screens';
import { RealmProvider } from '@realm/react';

// Import your models
import { UserLoginData } from './src/models/UserLoginData';
const Stack = createStackNavigator();
function App(): React.JSX.Element {
    return (
        // <NavigationContainer>
        //   <Stack.Navigator>
        //     <Stack.Screen name="Home" component={Home} />
        //   </Stack.Navigator>
        // </NavigationContainer>
        <RealmProvider schema={[UserLoginData]}>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false
                    }}
                // initialRouteName={'Dashboard'}
                >
                    <Stack.Screen name="SplashScreen" component={SplashScreen} />
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="SignupStep01" component={SignupStep01} />
                    <Stack.Screen name="SignupStep02" component={SignupStep02} />
                    <Stack.Screen name="SignupStep03" component={SignupStep03} />
                    <Stack.Screen name="Dashboard" component={MainLayout} />
                </Stack.Navigator>
            </NavigationContainer >
        </RealmProvider>
    );
}
export default App;