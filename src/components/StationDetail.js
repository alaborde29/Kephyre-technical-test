import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

function StationDetail({props}) {
    const navigation = useNavigation()
    return (
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate("Jumanji", props)}>
            {props.isOpen ? <Ionicons style={{paddingRight: 20, paddingLeft: 10}} name="location" size={40} color="green"/>
            : <Ionicons style={{paddingRight: 20, paddingLeft: 10}} name="location" size={40} color="red"/>}
            <View style={styles.container2}>
                <View style={styles.infos}>
                    <Text>{props.stationName} - n°{props.stationNumber}</Text>
                    <Text style={styles.textWrapper}>{props.stationAdress}</Text>
                </View>
                <View style={styles.inventory}>
                    <Text style={styles.numberText}>{props.bikeNumber}</Text>
                    <Ionicons name="bicycle" size={20} color="black"/>
                    <Text style={styles.numberText}>{props.freeSpace}</Text>
                    <Ionicons name="lock-open" size={20} color="black"/>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const StationList = ({ stations }) => {
  return (
    <>
      {stations.map((station, index) => (
        <StationDetail key={index} props={station}/>
      ))}
    </>
  );
};

export default StationList;

export { StationDetail, StationList }

const styles = StyleSheet.create({
    container: {
        padding: 10,
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderBottomColor: '#DDDDDD',
        backgroundColor: 'white',

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
        paddingLeft: 0
    },
    textWrapper : {
        alignItems: 'flex-start',
        flexShrink: 1,
    }
})