import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, StyleSheet} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_KEY } from '@env';

export default function RenderRoute(props) {
    console.log(props.start)
    console.log(props.end)
    const defaultRegion = {
        latitude: 47.222651271133344,
        longitude: -1.5535926509194946,
        latitudeDelta: 0.2,
        longitudeDelta: 0.2,
    }
    
    const [startStation, setStartStation] = useState(null);
    const [arrivaleStation, setArrivaleStation] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        setStartStation(findBestStart());
        setArrivaleStation(findBestEnd());
        setIsLoading(false);
      }, [props.start, props.end]);

    function calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // rayon de la terre en km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;
        return distance;
    }

    function findBestStart() {
        let bestLocation;
        let shortestDistance = Infinity;
      
        for (let i = 0; i < props.allStations.length; i++) {
            const location = props.allStations[i];
            const isOpen = location.isOpen;
            const hasBikes = location.bikeNumber > 0;
            if (isOpen && hasBikes) { // Ajouter les conditions de vérification
                const distance = calculateDistance(location.latitude, location.longitude, props.start.lat, props.start.lng);
                if (distance < shortestDistance) {
                    bestLocation = location;
                    shortestDistance = distance;
                }
            }
        }
        console.log(bestLocation)
        return bestLocation;
    }

    function findBestEnd() {
        let bestLocation;
        let shortestDistance = Infinity;
      
        for (let i = 0; i < props.allStations.length; i++) {
            const location = props.allStations[i];
            const isOpen = location.isOpen;
            const hasSpace = location.freeSpace > 0;
            if (isOpen && hasSpace) { // Ajouter les conditions de vérification
                const distance = calculateDistance(location.latitude, location.longitude, props.end.lat, props.end.lng);
                if (distance < shortestDistance) {
                    bestLocation = location;
                    shortestDistance = distance;
                }
            }
        }
        console.log(bestLocation)
        return bestLocation;
    }

    if (!startStation || !arrivaleStation) {
        return null; // Afficher un écran de chargement ou un indicateur de chargement
    }

    return (
        <>
            {isLoading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                startStation && arrivaleStation ? (
                    <View>
                        <MapView initialRegion={defaultRegion} style={styles.map}>
                            <MapViewDirections
                                origin={startStation}
                                destination={arrivaleStation}
                                apikey={GOOGLE_KEY} // insert your API Key here
                                strokeWidth={4}
                                strokeColor="#4287f5"
                            />
                            <Marker coordinate={startStation} />
                            <Marker coordinate={arrivaleStation} />
                        </MapView>
                    </View>
                ) : null
            )}
        </>
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
    },
    map: {
        width: '100%',
        height: '100%',
    },
})