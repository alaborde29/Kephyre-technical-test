import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "../screens/Home";
import BikeFinder from "../screens/BikeFinder";
import StationDetail from "../screens/StationDetail";

const Stack = createNativeStackNavigator();
const screenOptionStyle = {
    headerShown: false,
  };

const HomeStackNavigator = () => {
    return (
        <Stack.Navigator  screenOptions={screenOptionStyle}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="BikeFinder" component={BikeFinder} />
            <Stack.Screen name="StationDetail" component={StationDetail} />
        </Stack.Navigator>
    );
}

export default HomeStackNavigator;