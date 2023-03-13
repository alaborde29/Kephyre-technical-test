import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {BikeDetail} from '../components/BikeDetail';
import {StationDetail} from '../components/StationDetail';

export default function DetailScreen() {
    return (
        <View>
            <BikeDetail props={{number: '5', avisJours: '3', numberAvis: '55'}}/>
            {/* <StationDetail props={{
                stationName: 'Place du Cirque', 
                stationAdress: '3 Rue Champignon', 
                stationNumber: '3', 
                numberAvis: '55',
                bikeNumber: '7',
                parkNumber: '7',
            }}/> */}
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
    }
})