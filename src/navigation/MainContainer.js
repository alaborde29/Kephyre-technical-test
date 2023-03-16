import * as React from 'react';
import {NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionSpecs } from '@react-navigation/stack';
import { DrawerContent, DrawerContentScrollView, DrawerItemList, createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import { Image , Text, StyleSheet} from 'react-native';
import MapScreen from '../screens/Map';
import DetailScreen from '../screens/Details';
import StationInfosScreen from '../screens/StationInfos';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const drawerOptions={
    drawerActiveTintColor: "#598633",
    headerStyle: {
        backgroundColor: "#598633",
    },
    headerTintColor: "white",
    headerTitleStyle: {
        fontWeight: "bold",
        color: "white",
    },
}

const detailsOptions={
    headerStyle: {
        backgroundColor: "#598633",
    },
    headerTintColor: "white",
    headerTitleStyle: {
        fontWeight: "bold",
        color: "white",
    },
    // transitionSpec: {
    //     open: animConfig,
    //     close: animConfig,
    // }
}

const animConfig = {
    animation: 'timing',
    config: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };

function DetailContainer({props}) {
    return (
        <Stack.Navigator screenOptions={detailsOptions}>
            <Stack.Screen name={'Liste des Stations'} component={DetailScreen}/>
            <Stack.Screen name={'Jumanji'} component={StationInfosScreen}/>
        </Stack.Navigator>
    )
}

const CustomDrawer = (props) => {
    return (
        <DrawerContentScrollView >
            <Image style={styles.headerImage} source={require('../../assets/placeholder.png')}/>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    )
}

export default function MainContainer({props}) {
    return (
        <NavigationContainer>
            <Drawer.Navigator
                screenOptions={drawerOptions}
                // drawerContent={(props) => <CustomDrawer {...props}/>}
            >
                <Drawer.Screen name={'Carte'} component={MapScreen}/>
                <Drawer.Screen name={'Liste des stations'} component={DetailContainer} options={{ headerShown: false }}/>
                <Drawer.Screen name={'Infos de la Station'} component={StationInfosScreen}/>
            </Drawer.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    headerImage: {
        width: '50%',
        height: '50%',
        alignContent: 'center',
        justifyContent: 'center'
    }
})