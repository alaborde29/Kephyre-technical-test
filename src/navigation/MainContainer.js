import * as React from 'react';
import {NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/Home';
import SettingsScreen from '../screens/Settings';
import DetailScreen from '../screens/Details';


const Tab = createBottomTabNavigator()

export default function MainContainer({props}) {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName='Home'
                screenOptions={({route}) => ({
                    tabBarIcon: ({focused, color, size}) => {
                        let iconName;
                        let rn = route.name;

                        if (rn === 'Home') {
                            iconName = focused ? 'home' : 'home-outline';
                        } else if (rn === 'Detail') {
                            iconName = focused ? 'list' : 'list-outline';
                        } else if (rn === 'Settings') {
                            iconName = focused ? 'settings' : 'settings-outline';
                        } 

                        return <Ionicons name={iconName} size={size} color={color}/>
                    }
                })}
                >
                
                <Tab.Screen name={'Home'} component={HomeScreen}/>
                <Tab.Screen name={'Detail'} component={DetailScreen}/>
                <Tab.Screen name={'Settings'} component={SettingsScreen}/>
            </Tab.Navigator>
        </NavigationContainer>
    )
}