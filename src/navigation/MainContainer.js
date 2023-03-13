import * as React from 'react';
import {NavigationContainer } from '@react-navigation/native';
import { DrawerContent, DrawerContentScrollView, DrawerItemList, createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import { Image , Text, StyleSheet} from 'react-native';
import MapScreen from '../screens/Map';
import DetailScreen from '../screens/Details';


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
                <Drawer.Screen name={'Map'} component={MapScreen}/>
                <Drawer.Screen name={'Detail'} component={DetailScreen}/>
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