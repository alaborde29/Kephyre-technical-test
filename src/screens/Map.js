import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Searchbar, IconButton, Button } from 'react-native-paper';
import { JCD_KEY } from '@env';
import { createStackNavigator } from '@react-navigation/stack';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';

const Stack = createStackNavigator();

export default function MapScreen() {
    let [error, setError] = useState();
    let [allMarkerLocation, setAllMarkerLocation] = useState([]);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const onChangeSearch = query => setSearchQuery(query);
    const [openOnly, setOpenOnly] = useState(false);
    const [freeOnly, setFreeOnly] = useState(false);
    const [ridable, setRidable] = useState(false);
    const [buttonColorToggle, setButtonColorToggle] = useState({
        stationColor: "#ededed",
        parkColor: "#ededed",
        bikeColor: "#ededed"
    });
    const defaultRegion = {
        latitude: 47.222651271133344,
        longitude: -1.5535926509194946,
        latitudeDelta: 0.2,
        longitudeDelta: 0.2,
    }
    const [region, setRegion] = useState(defaultRegion);
    const api_key = JCD_KEY
    const mapRef = React.createRef();
    const navigation = useNavigation()

    useEffect(() => {
        fetch(
          'https://api.jcdecaux.com/vls/v3/stations?contract=nantes&apiKey=' + api_key
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
    
    const MarkerList = (props) => {
        const { markerLocation } = props;
        
        return (
            <>
                {markerLocation.map((marker, index) => (
                    <Marker 
                        key={index} 
                        coordinate={marker.pos} 
                        pinColor={marker.openStatus ? 'red' : 'green'}
                        onPress={() => navigation.navigate("Jumanji", marker)}
                    />
                ))}
            </>
        );
    };

    const resetMap = () => {
        setRegion(defaultRegion)
        mapRef.current.animateToRegion(defaultRegion)
    }

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


    if (isLoading) {
        // if data is loading, show the spinner
        return (
          <ScrollView contentContainerStyle={styles.genericView}>
            <ActivityIndicator size="large" color="#0000ff" />
          </ScrollView>
        );
      }
    
      return (
        <SafeAreaView style={styles.genericView}>
            <MapView
                style={styles.map}
                initialRegion={defaultRegion}
                region={region}
                ref={mapRef}
                showsCompass={false}
            >
                <MarkerList markerLocation={allMarkerLocation.filter(allMarkerLocation =>
                    (!openOnly || allMarkerLocation.isOpen) &&
                    (!freeOnly || allMarkerLocation.freeSpace > 0) && 
                    (!ridable || allMarkerLocation.bikeNumber > 0)
                )} />
            </MapView>
            <View style={styles.buttonView}>
                <IconButton
                    mode="contained"
                    icon="map-marker-down"
                    iconColor={"#559842"}
                    size={30}
                    onPress={() => resetMap()}
                />
                <IconButton
                    mode="contained"
                    icon="crosshairs-gps"
                    iconColor={"#559842"}
                    size={30}
                    onPress={() => console.log('Pressed')}
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
        </SafeAreaView>
      );
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
        height: '100%',
    },
    buttonView: {
        position: 'absolute',
        alignContent: "space-around",
        justifyContent: 'space-around',
        flexDirection: 'column',
        top: '80%',
        left: '80%'

    },
    filters: {
        position: 'absolute',
        alignSelf: 'center',
        flexDirection: 'row',
        top: 20
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