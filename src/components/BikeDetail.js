import * as React from 'react';
import { View, Text, StyleSheet, Animated, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Swipeable, RectButton } from 'react-native-gesture-handler';

function BikeDetail({props}) {
    const createTwoButtonAlert = () =>
    Alert.alert('Vélo n°8', 'Souhaitez-vous débloquer ce vélo ?', [
      {
        text: 'Oui',
        onPress: () => console.log('Oui Pressed'),
        style: 'cancel',
      },
      {text: 'Non', onPress: () => console.log('Non Pressed')},
    ]);

    renderLeftActions = () => {
        return (
            <RectButton style={styles.leftAction} onPress={() => createTwoButtonAlert()}>
                <Text style={styles.actionText}>
                        Débloquer
                </Text>
            </RectButton>
        );
    };
    return (
        <Swipeable renderRightActions={this.renderLeftActions}>
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
        </Swipeable>
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
        borderBottomColor: '#DDDDDD',
        backgroundColor: 'white',
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
    leftAction : {
        borderBottomWidth: 2,
        borderBottomColor: '#DDDDDD',
        width: 40,
        backgroundColor: 'red',
        width: 70,
        direction: 'rtl',
        justifyContent: 'center',
        alignItems: 'center'
    },
    actionText: {
        fontSize: 15,
        color: 'white'
    },
    slidingButton: {
        backgroundColor: "red"
    }
})