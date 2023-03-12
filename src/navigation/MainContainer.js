import * as React from 'react';
import {NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';

import MapScreen from '../screens/Map';
import DetailScreen from '../screens/Details';


const Drawer = createDrawerNavigator()

export default function MainContainer({props}) {
    return (
        <NavigationContainer>
            <Drawer.Navigator>
                <Drawer.Screen name={'Map'} component={MapScreen}/>
                <Drawer.Screen name={'Detail'} component={DetailScreen}/>
            </Drawer.Navigator>
        </NavigationContainer>
    )
}