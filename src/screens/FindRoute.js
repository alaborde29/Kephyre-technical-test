import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator, ScrollView, PermissionsAndroid } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import {BikeDetail} from '../components/BikeDetail';
import {StationDetail, StationList} from '../components/StationDetail';
import { createStackNavigator } from '@react-navigation/stack';
import { JCD_KEY, GOOGLE_KEY } from '@env';
import { useNavigation } from '@react-navigation/native';
import { Searchbar } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import RenderRoute from '../components/mapWithRoute';

const Stack = createStackNavigator();

const placeholderBike = {
    number: 95,
    numberAvis: 98,
    avisJours: 4,
}

export default function FindRouteScreen(props) {
    const [searchQueryStart, setSearchQueryStart] = React.useState('');
    const [searchQueryEnd, setSearchQueryEnd] = React.useState('');
    const [startLocation, setStartLocation] = React.useState(null);
    const [endLocation, setEndLocation] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);
    let [error, setError] = useState();
    let [allMarkerLocation, setAllMarkerLocation] = useState([]);
    const onChangeSearchStart = query => setSearchQueryStart(query);
    const onChangeSearchEnd = query => setSearchQueryEnd(query);
    const navigation = useNavigation()

    useEffect(() => {
        fetch(
          'https://api.jcdecaux.com/vls/v3/stations?contract=nantes&apiKey=' + JCD_KEY
        )
          .then((res) => res.json())
          .then(
            (result) => {
              const locations = [];
    
              for (let i = 0; i < result.length; i++) {
                    let openStatus = true;
                    if (result[i].status != "OPEN")
                        openStatus = false;
                    const props = {
                        pos: {
                            latitude: result[i].position.latitude,
                            longitude: result[i].position.longitude,
                            latitudeDelta: 0.1,
                            longitudeDelta: 0.1,
                        },
                        stationName: result[i].name, 
                        stationAdress: result[i].address, 
                        stationNumber: result[i].number, 
                        isOpen: openStatus,
                        bikeNumber: result[i].totalStands.availabilities.bikes,
                        freeSpace: result[i].totalStands.availabilities.stands,
                        location: result[i].position
                    };
                    locations.push(props);
              }
              setAllMarkerLocation(locations);
              setIsLoading(false); // set loading to false after data is fetched
            },
            (error) => {
              setError(error);
              setIsLoading(false);
            }
          );
    }, []);

    return (
        <View>
            <View style={styles.routeHeader}>
                <View style={styles.headerSideIcons}>
                    <Ionicons name={'ellipse-outline'} color={'white'} size={30}/>
                    <Ionicons name={'ellipsis-vertical-outline'} color={'white'} size={30}/>
                    <Ionicons name={'location'} color={'white'} size={30}/>
                </View>
                <View style={styles.routeBar}>
                    <GooglePlacesAutocomplete
                        placeholder='Départ'
                        fetchDetails={true}
                        onPress={(data, details = null) => {
                            setStartLocation(details.geometry.location);
                        }}
                        query={{
                            key: GOOGLE_KEY,
                            language: 'fr',
                            components: 'country:fr',
                        }}
                        styles={{
                            listView: {
                                position: 'absolute',
                                top: 100,
                                left: 0,
                                right: 0,
                                backgroundColor: 'white',
                                borderRadius: 5,
                                borderWidth: 1,
                                borderColor: '#D9D9D9',
                                elevation: 3,
                                zIndex: 999,
                            },
                        }}
                    />
                    <GooglePlacesAutocomplete
                        placeholder='Arrivée'
                        onPress={(data, details = null) => {
                            setEndLocation(details.geometry.location);
                        }}
                        fetchDetails={true}
                        query={{
                            key: GOOGLE_KEY,
                            language: 'fr',
                            components: 'country:fr',
                        }}
                        styles={{
                            listView: {
                                position: 'absolute',
                                top: 45,
                                left: 0,
                                right: 0,
                                backgroundColor: 'white',
                                borderRadius: 5,
                                borderWidth: 1,
                                borderColor: '#D9D9D9',
                                elevation: 3,
                                zIndex: 999,
                            },
                        }}
                    />
                </View>
                <View style={styles.headerSwitchButton}>
                    <Ionicons name={'swap-vertical'} color={'white'} size={30} onPress={() => swapQueries()}/>
                </View>
            </View>
            {(!isLoading && startLocation && endLocation) && (
                <RenderRoute
                        allStations={allMarkerLocation}
                        start={startLocation}
                        end={endLocation}
                />
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
    routeHeader: {
        backgroundColor: '#598633',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: "center",
        flexDirection: 'row'
    },
    routeBar: {
        marginBottom: 20,
        marginTop: 20,
        height: 100,
        width: 250,
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