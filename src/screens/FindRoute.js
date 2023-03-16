import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import {BikeDetail} from '../components/BikeDetail';
import {StationDetail, StationList} from '../components/StationDetail';
import { createStackNavigator } from '@react-navigation/stack';
import { JCD_KEY } from '@env';
import { useNavigation } from '@react-navigation/native';
import { Searchbar } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();

const placeholderBike = {
    number: 95,
    numberAvis: 98,
    avisJours: 4,
}

export default function FindRouteScreen(props) {
    const [searchQueryStart, setSearchQueryStart] = React.useState('');
    const [searchQueryEnd, setSearchQueryEnd] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(true);
    const onChangeSearchStart = query => setSearchQueryStart(query);
    const onChangeSearchEnd = query => setSearchQueryEnd(query);
    const navigation = useNavigation()

    function swapQueries() {
        let tmp = searchQueryStart
        setSearchQueryStart(searchQueryEnd)
        setSearchQueryEnd(searchQueryStart)
    }
    return (
        <View>
            <View style={styles.routeHeader}>
                <View style={styles.headerSideIcons}>
                    <Ionicons name={'ellipse-outline'} color={'white'} size={30}/>
                    <Ionicons name={'ellipsis-vertical-outline'} color={'white'} size={30}/>
                    <Ionicons name={'location'} color={'white'} size={30}/>
                </View>
                <View>
                    <Searchbar
                        placeholder="Rechercher une station"
                        onChangeText={onChangeSearchStart}
                        value={searchQueryStart}
                        style={styles.routeBar}
                        inputStyle={styles.barText}
                    />
                    <Searchbar
                        placeholder="Rechercher une station"
                        onChangeText={onChangeSearchEnd}
                        value={searchQueryEnd}
                        style={styles.routeBar}
                        inputStyle={styles.barText}
                    />
                </View>
                <View style={styles.headerSwitchButton}>
                    <Ionicons name={'swap-vertical'} color={'white'} size={30} onPress={() => swapQueries()}/>
                </View>
            </View>
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
    routeHeader: {
        backgroundColor: '#598633',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: "center",
        flexDirection: 'row'
    },
    routeBar: {
        backgroundColor: "#9dc779",
        height: 40,
        marginBottom: 10,
        marginTop: 10,
        width: 250
    },
    headerSideIcons: {
        flexDirection: 'column',
        marginRight: 15
    },
    headerSwitchButton: {
        flexDirection: 'row',
        marginLeft: 10
    },
    barText: {
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: "center",
        paddingBottom: 17
    }
})