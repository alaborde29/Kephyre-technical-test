import * as React from 'react';
import {NavigationContainer } from '@react-navigation/native';
import { DrawerContent, DrawerContentScrollView, DrawerItemList, createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import { Image , Text, StyleSheet} from 'react-native';
import MapScreen from '../screens/Map';
import DetailScreen from '../screens/Details';
import StationInfosScreen from '../screens/StationInfos';


const Drawer = createDrawerNavigator()

const option={
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
                screenOptions={option}
                // drawerContent={(props) => <CustomDrawer {...props}/>}
            >
                <Drawer.Screen name={'Carte'} component={MapScreen}/>
                <Drawer.Screen name={'Liste des Stations'} component={DetailScreen}/>
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