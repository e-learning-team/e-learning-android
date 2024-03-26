/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import {
    SplashScreen,
    Home,
    Login,
    MainLayout,
    SignupStep01,
    SignupStep02,
    SignupStep03,
    ForgetPasswordStep01,
    ForgetPasswordStep02,
    ForgetPasswordStep03,
    Profile,
    Search,
} from './src/screens';
import Tabs from './src/naviagtion/tabs';
import { Text, View } from 'react-native';
import { FONTS } from './src/constants';
import { AppProvider } from '@realm/react';
import { RealmProvider, UserLoginData } from './src/models/UserLoginData';
const Stack = createStackNavigator();
import { createRealmContext } from '@realm/react';
// import { configRealm } from './src/models/UserLoginData';
// const { RealmProvider, useRealm, useObject, useQuery } = createRealmContext(configRealm);
function App(): React.JSX.Element {

    return (
        // <AppProvider id=''>
            <RealmProvider schema={[UserLoginData]}>
                <NavigationContainer>
                    <Stack.Navigator
                        screenOptions={{
                            headerShown: false,
                            presentation: 'modal',
                        }}
                        initialRouteName={'SplashScreen'}
                    >
                        <Stack.Screen name="SplashScreen" component={SplashScreen} />
                        <Stack.Screen name="Login" component={Login} />

                        <Stack.Screen name="SignupStep01" component={SignupStep01} />
                        <Stack.Screen name="SignupStep02" component={SignupStep02} />
                        <Stack.Screen name="SignupStep03" component={SignupStep03} />

                        <Stack.Screen name="ForgetPasswordStep01" component={ForgetPasswordStep01} />
                        <Stack.Screen name="ForgetPasswordStep02" component={ForgetPasswordStep02} />
                        <Stack.Screen name="ForgetPasswordStep03" component={ForgetPasswordStep03} />


                        <Stack.Screen name="Dashboard" component={Tabs} />
                        
                        <Stack.Screen name="Home" component={Home} />
                        <Stack.Screen name="Search" component={Search} />
                        <Stack.Screen name="Profile" component={Profile} />

                    </Stack.Navigator>
                </NavigationContainer >
            </RealmProvider>
        // </AppProvider>

    );
}

export default App;
