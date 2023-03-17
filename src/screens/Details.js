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
    const [openOnly, setOpenOnly] = useState(false);
    const [freeOnly, setFreeOnly] = useState(false);
    const [ridable, setRidable] = useState(false);
    const [buttonColorToggle, setButtonColorToggle] = useState({
        stationColor: "#ededed",
        parkColor: "#ededed",
        bikeColor: "#ededed"
    });
    const onChangeSearch = query => setSearchQuery(query);
    const api_key = JCD_KEY

    useEffect(() => {
        fetch("https://api.jcdecaux.com/vls/v3/stations?contract=nantes&apiKey=" + api_key)
        .then(res => res.json())
        .then(
            (result) => {
                const stations = [];

                setAllStations(result);

                for (let i = 0; i < result.length; i++) {
                        let openStatus = true;
                        if (result[i].status != "OPEN")
                            openStatus = false;
                        const props = {
                            stationName: result[i].name, 
                            stationAdress: result[i].address, 
                            stationNumber: result[i].number, 
                            isOpen: openStatus,
                            bikeNumber: result[i].totalStands.availabilities.bikes,
                            freeSpace: result[i].totalStands.availabilities.stands,
                            location: result[i].position
                        };
                        stations.push(props);
                        setIsLoading(false);
                }
                setStationsProps(stations);
            },
            (error) => {
                setError(error);
                setIsLoading(false);
            },  
        )
    }, []);

    const handleOpenOnlyToggle = () => {
        setOpenOnly(!openOnly);
        if (buttonColorToggle.stationColor == "#ededed") {
            setButtonColorToggle({
                stationColor: "#63a85d",
                parkColor: buttonColorToggle.parkColor,
                bikeColor: buttonColorToggle.bikeColor
            })
        } else {
            setButtonColorToggle({
                stationColor: "#ededed",
                parkColor: buttonColorToggle.parkColor,
                bikeColor: buttonColorToggle.bikeColor
            })
        }
    };

    const handleFreeOnlyToggle = () => {
        setFreeOnly(!freeOnly);
        if (buttonColorToggle.parkColor == "#ededed") {
            setButtonColorToggle({
                stationColor: buttonColorToggle.stationColor,
                parkColor: "#63a85d",
                bikeColor: buttonColorToggle.bikeColor
            })
        } else {
            setButtonColorToggle({
                stationColor: buttonColorToggle.stationColor,
                parkColor: "#ededed",
                bikeColor: buttonColorToggle.bikeColor
            })
        }
    };

    const handleRidableToggle = () => {
        setRidable(!ridable);
        if (buttonColorToggle.bikeColor == "#ededed") {
            setButtonColorToggle({
                stationColor: buttonColorToggle.stationColor,
                parkColor: buttonColorToggle.parkColor,
                bikeColor: "#63a85d",
            })
        } else {
            setButtonColorToggle({
                stationColor: buttonColorToggle.stationColor,
                parkColor: buttonColorToggle.parkColor,
                bikeColor: "#ededed",
            })
        }
    };

    const handleSearch = (text) => {
        setSearchQuery(text);
      };
    
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
                    <StationList stations={stationsProps.filter(station =>
                        (!openOnly || station.isOpen) &&
                        (!freeOnly || station.freeSpace > 0) && 
                        (!ridable || station.bikeNumber > 0) &&
                        (station.stationName.toLowerCase().includes(searchQuery.toLowerCase())) // Ajout de la condition de recherche
                    )} />
                </ScrollView>
                <View style={styles.hoverContainer}>
                    <Searchbar
                        placeholder="Rechercher une station"
                        onChangeText={handleSearch}
                        value={searchQuery}
                        style={styles.searchBar}
                    />
                </View>
                <ScrollView style={styles.filters} horizontal={true} showsHorizontalScrollIndicator={false}>
                    <Button icon="bike" mode="contained" style={styles.buttonDeselected} buttonColor={buttonColorToggle.stationColor} textColor='black' onPress={() => handleOpenOnlyToggle()}>
                        Station ouverte
                    </Button>
                    <Button icon="parking" mode="contained" style={styles.buttonDeselected} buttonColor={buttonColorToggle.parkColor} textColor='black' onPress={() => handleFreeOnlyToggle()}>
                        Place disponible
                    </Button>
                    <Button icon="bicycle" mode="contained" style={styles.buttonDeselected} buttonColor={buttonColorToggle.bikeColor} textColor='black' onPress={() => handleRidableToggle()}>
                        Vélo disponible
                    </Button>
                </ScrollView>
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
        height: 115
    },
    filters: {
        position: 'absolute',
        alignSelf: 'center',
        flexDirection: 'row',
        marginTop: 80,
    },
    buttonDeselected: {
        marginHorizontal: 5,
        borderColor: 'green',
        elevation: 20,
        shadowColor: 'black',
        shadowRadius: 5,
        shadowOpacity: '70%'
    }
})