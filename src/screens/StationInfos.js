import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import {BikeDetail} from '../components/BikeDetail';
import {StationDetail, StationList} from '../components/StationDetail';
import { createStackNavigator } from '@react-navigation/stack';
import { JCD_KEY } from '@env';
import { useNavigation } from '@react-navigation/native';

const Stack = createStackNavigator();

// const stationsProps = [
//     {
//         stationName: 'Place du Cirque', 
//         stationAdress: '3 Rue Champignon', 
//         stationNumber: '3', 
//         numberAvis: '55',
//         bikeNumber: '7',
//         parkNumber: '7',
//     },
//     {
//         stationName: 'Commerces', 
//         stationAdress: '72 Avenue de l\'orange', 
//         stationNumber: '9', 
//         numberAvis: '72',
//         bikeNumber: '0',
//         parkNumber: '11',
//     },
//     {
//         stationName: 'Aristide Brillant', 
//         stationAdress: '123 Route du Colonel Moutarde', 
//         stationNumber: '8', 
//         numberAvis: '27',
//         bikeNumber: '10',
//         parkNumber: '3',
//     }
// ]

const placeholderBike = {
    number: 95,
    numberAvis: 98,
    avisJours: 4,
}

export default function StationInfosScreen(props) {
    const navigation = useNavigation()

    const defaultRegion = {
        latitude: props.route.params.location.latitude,
        longitude: props.route.params.location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    }

    const Station = {
        isOpen: props.route.params.isOpen,
        stationName: props.route.params.stationName,
        stationNumber: props.route.params.stationNumber,
        stationAdress: props.route.params.stationAdress,
        bikeNumber: props.route.params.bikeNumber,
        freeSpace: props.route.params.freeSpace,
    }

    const bikes = Array.from({ length: props.route.params.bikeNumber })
    
    useEffect(() => {
        navigation.setOptions({ title: props.route.params.stationName });
    }, [navigation, props.route.params.stationName])
    
    return (
        <View>
            <MapView style={styles.map} initialRegion={defaultRegion} region={defaultRegion} scrollEnabled={false} zoomEnabled={false} rotateEnabled={false} pitchEnabled={false}>
                <Marker coordinate={defaultRegion}/>
            </MapView>
            <StationDetail props={Station}/>
            {props.route.params.bikeNumber > 0 && (
                <ScrollView>
                    {bikes.map((_, index) => <BikeDetail key={index} props={placeholderBike} />)}
                </ScrollView>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    genericText: {
        fontSize: 26,
        fontWeight: 'bold',
    },
    genericView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    map: {
        width: '100%',
        height: 150,
    },
})