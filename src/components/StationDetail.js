import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

function StationDetail({props}) {
    return (
        <View style={styles.container}>
            <Ionicons style={{paddingRight: 20, paddingLeft: 10}} name="location" size={40} color="black"/>
            <View style={styles.container2}>
                <View style={styles.infos}>
                    <Text>{props.stationName} - n°{props.stationNumber}</Text>
                    <Text>{props.stationAdress}</Text>
                </View>
                <View style={styles.inventory}>
                    <Text style={styles.numberText}>{props.bikeNumber}</Text>
                    <Ionicons name="bicycle" size={20} color="black"/>
                    <Text style={styles.numberText}>{props.parkNumber}</Text>
                    <Ionicons name="car" size={20} color="black"/>
                </View>
            </View>
        </View>
    )
}

export { StationDetail }

const styles = StyleSheet.create({
    container: {
        padding: 10,
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderBottomColor: '#DDDDDD'
    },
    container2: {
        flexDirection: 'column',
    },
    numberText: {
        fontSize: 30,
        color: 'orange',
        fontWeight: 'bold',
        paddingHorizontal: 10,
    },
    infos: {
        paddingTop: 5,
    },
    inventory: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: '10'
    }
})