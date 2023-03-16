import * as React from 'react';
import { useState, useEffect } from 'react';
import {BikeDetail} from '../components/BikeDetail';
import { Searchbar, IconButton, Button } from 'react-native-paper';
import {StationDetail, StationList} from '../components/StationDetail';
import { createStackNavigator } from '@react-navigation/stack';
import { ActivityIndicator, ScrollView, View, Text, StyleSheet, SafeAreaView  } from 'react-native';
import { JCD_KEY } from '@env';
import { useNavigation } from '@react-navigation/native';

const Stack = createStackNavigator();

export default function DetailScreen(props) {
    let [error, setError] = useState();
    let [allStations, setAllStations] = useState();
    const [stationsProps, setStationsProps] = useState([]);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(true);
    const onChangeSearch = query => setSearchQuery(query);
    const api_key = JCD_KEY

    useEffect(() => {
        fetch("https://api.jcdecaux.com/vls/v3/stations?contract=nantes&apiKey=" + api_key)
        .then(res => res.json())
        .then(
            (result) => {
                const stations = [];

                console.log(result);
                setAllStations(result);
                setIsLoading(false);

                for (let i = 0; i < result.length; i++) {
                        let openStatus = true;
                        if (result[i].status != "OPEN")
                            openStatus = false;
                        const props = {
                            stationName: result[i].name, 
                            stationAdress: result[i].address, 
                            stationNumber: result[i].number, 
                            isOpen: openStatus,
                            bikeNumber: '7',
                            freeSpace: '7',
                        };
                        stations.push(props);
                }
                setStationsProps(stations);
            },
            (error) => {
                setError(error);
                setIsLoading(false);
            },  
        )
    }, []);
    
    if (isLoading) {
        return (
            <ScrollView>
                <ActivityIndicator size="large" color="#0000ff" />
            </ScrollView>
        );
    } else {
        return (
            <View>
                <ScrollView contentContainerStyle={styles.genericView}>
                    <View style={styles.emptySpace}/>
                    <StationList stations={stationsProps}/>
                </ScrollView>
                <View style={styles.hoverContainer}>
                    <Searchbar
                        placeholder="Rechercher une station"
                        onChangeText={onChangeSearch}
                        value={searchQuery}
                        style={styles.searchBar}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    genericText: {
        fontSize: 26,
        fontWeight: 'bold',
    },
    genericView: {
        backgroundColor: 'white'
    },
    searchBar: {
        width: '90%',
        alignSelf: 'center',
        marginTop: 10
    },
    hoverContainer: {
        position: 'absolute',
        width: '100%',
    },
    emptySpace: {
        backgroundColor: 'white',
        height: 60
    }
})