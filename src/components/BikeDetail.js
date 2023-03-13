import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

function BikeDetail({props}) {
    return (
        <View style={styles.container}>
            <View style={styles.bikeLogo}>
                <Ionicons name="bicycle" size={20} color="black"/>
                <Text>3856</Text>
            </View>
            <Text style={styles.numeroText}>#{props.number}</Text>
            <View style={styles.containerNote}>
                <Ionicons name="star" size={30} color="orange"/>
                <Ionicons name="star" size={30} color="orange"/>
                <Ionicons name="star-outline" size={30} color="orange"/>
            </View>
            <View style={styles.containerAvis}>
                <Text>{props.numberAvis} avis</Text>
                <Text style={styles.avisText}>Dernier avis il y a {props.avisJours} jours</Text>
            </View>
        </View>
    )
}

export {BikeDetail}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderBottomColor: '#DDDDDD'
    },
    containerAvis: {
        justifyContent: 'space-around',
        flexDirection: 'column',
    },
    containerNote: {
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
    bikeLogo: {
        alignItems: 'center',
        flexDirection: 'column',
    },
    textTest : {
        color: 'blue',
    },
    avisText : {
        color: '#999999',
        fontSize: 10,
    },
    numeroText : {
        fontSize: 30,
    },
})