import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

const defaultRegion = {
    latitude: 47.222651271133344,
    longitude: -1.5535926509194946,
    latitudeDelta: 0.2,
    longitudeDelta: 0.2,
}

export default function MapScreen({props}) {
    return (
        <View style={styles.genericView}>
            <MapView 
                style={styles.map}
                region={defaultRegion}
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
})