import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Searchbar, IconButton } from 'react-native-paper';
import { JCD_KEY } from '@env';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function MapScreen() {
    let [error, setError] = useState();
    let [allMarkerLocation, setAllMarkerLocation] = useState([]);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const onChangeSearch = query => setSearchQuery(query);
    const defaultRegion = {
        latitude: 47.222651271133344,
        longitude: -1.5535926509194946,
        latitudeDelta: 0.2,
        longitudeDelta: 0.2,
    }
    const [region, setRegion] = useState(defaultRegion);
    const api_key = JCD_KEY
    const mapRef = React.createRef();

    useEffect(() => {
        fetch(
          'https://api.jcdecaux.com/vls/v3/stations?contract=nantes&apiKey=' + api_key
        )
          .then((res) => res.json())
          .then(
            (result) => {
              const locations = [];
    
              for (let i = 0; i < result.length; i++) {
                const props = {
                  latitude: result[i].position.latitude,
                  longitude: result[i].position.longitude,
                  latitudeDelta: 0.1,
                  longitudeDelta: 0.1,
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
                    <Marker key={index} coordinate={marker} />
                ))}
            </>
        );
    };

    const resetMap = () => {
        setRegion(defaultRegion)
        mapRef.current.animateToRegion(defaultRegion)
    }


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
            <MapView style={styles.map} initialRegion={defaultRegion} region={region} ref={mapRef} showsUserLocation={true}>
                <MarkerList markerLocation={allMarkerLocation} />
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
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        top: '90%',
    },

})