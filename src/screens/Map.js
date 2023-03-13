import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import { Searchbar } from 'react-native-paper';
import { JCD_KEY } from '@env';

const defaultRegion = {
    latitude: 47.222651271133344,
    longitude: -1.5535926509194946,
    latitudeDelta: 0.2,
    longitudeDelta: 0.2,
}

export default function MapScreen({props}) {
    let [error, setError] = useState();
    let [allStations, setAllStations] = useState();
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query => setSearchQuery(query);

    const api_key = JCD_KEY

    useEffect(() => {
        fetch("https://api.jcdecaux.com/vls/v3/stations?contract=nantes&apiKey=" + api_key)
        .then(res => res.json())
        .then(
            (result) => {
                setAllStations(result);
            },
            (error) => {
                setError(error);
            },  
        )
    }, []);
    
//pour render un json ou une info, utiliser JSON.strigify(object)

    const getContent = () => {
        if (allStations != undefined) {
            return <Text>First station number :</Text>
        } else {
            return <Text>Undefined</Text>
        }
    };

    return (
        <View style={styles.genericView}>
            {getContent()}
            <MapView 
                style={styles.map}
                region={defaultRegion}
            />
            <Searchbar
                placeholder="Rechercher une station"
                onChangeText={onChangeSearch}
                value={searchQuery}
                style={styles.searchBar}
            />
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
        height: '100%',
    },
    searchBar: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        top: 10,
        width: '90%',
    },

})