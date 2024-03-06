import React from "react";
import {
    Image,
    TouchableOpacity,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Home, Search, Profile } from "../screens";
import { COLORS, icons } from "../constants";
import { TabIcon } from "../components";

const Tab = createBottomTabNavigator();

const Tabs = () => {

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: COLORS.primary,
                    borderTopColor: "transparent",
                    height: 70,
                    
                },
                tabBarLabelStyle: {
                    marginBottom: 10,
                    fontSize: 12,
                },
                tabBarShowLabel: false,
            })}
        // tabBarOptions={{
        //     style: {
        //         backgroundColor: COLORS.primary,
        //         borderTopColor: "transparent",
        //     }
        // }}
        >
            <Tab.Screen
                name="Home"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon 
                            focused={focused}
                            icon={icons.home}
                            label="Home"
                            />
                        // <Image source={icons.home} className="w-[30] h-[30]" />
                    ),
                }}
                component={Home}
            />
            <Tab.Screen
                name="Search"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon 
                            focused={focused}
                            icon={icons.search}
                            label="Search"
                            />
                        // <Image source={icons.piechart} className="w-[30] h-[30]" style={{
                        //     tintColor: COLORS.white
                        // }}/>
                    ),
                }}
                component={Search}
            />
            {/* <Tab.Screen
                name="Trade"
                component={Home}
            /> */}
            {/* <Tab.Screen
                name="Market"
                component={Market}
            /> */}
            <Tab.Screen
                name="Profile"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon 
                            focused={focused}
                            icon={icons.profile}
                            label="Profile"
                            />
                        // <Image source={icons.profile} className="w-[30] h-[30]" style={{
                        //     tintColor: COLORS.white
                        // }}/>
                    ),
                }}
                component={Profile}
            />
        </Tab.Navigator>
    );
};

export default Tabs;