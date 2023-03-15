import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import {BikeDetail} from '../components/BikeDetail';
import {StationDetail, StationList} from '../components/StationDetail';
import { createStackNavigator } from '@react-navigation/stack';
import { JCD_KEY } from '@env';

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

const defaultRegion = {
    latitude: 47.222651271133344,
    longitude: -1.5535926509194946,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
}

const placeholderStation = {
    isOpen: true,
    stationName: '010- PICASSO',
    stationNumber: '7',
    stationAdress: "12, mail Pablo Picasso",
    bikeNumber: "8",
    freeSpace: "2"
}

const placeholderBike = {
    number: 95,
    numberAvis: 98,
    avisJours: 4,
}

export default function StationInfosScreen(props) {
    return (
        <View>
            <MapView style={styles.map} initialRegion={defaultRegion} region={defaultRegion} scrollEnabled={false} zoomEnabled={false} rotateEnabled={false} pitchEnabled={false}>
                <Marker coordinate={{
                    latitude: 47.222651271133344,
                    longitude: -1.5535926509194946,
                    latitudeDelta: 0.2,
                    longitudeDelta: 0.2,
                }}/>
            </MapView>
            <StationDetail props={placeholderStation}/>
            <ScrollView>
                <BikeDetail props={placeholderBike}/>
                <BikeDetail props={placeholderBike}/>
                <BikeDetail props={placeholderBike}/>
                <BikeDetail props={placeholderBike}/>
            </ScrollView>
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