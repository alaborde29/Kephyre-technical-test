import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const BikeFinder = (props) => {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Find your Bike Screen</Text>
        <TouchableOpacity
            style={styles.pageButton}
            onPress={props.navigation.navigate("Home")}
        >
            <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.pageButton}
            onPress={props.navigation.navigate("StationDetail")}
        >
            <Text>StationDetail</Text>
        </TouchableOpacity>
      </View>
    );
}

export default BikeFinder;

const styles = StyleSheet.create({
    pageButton: {
        marginTop: 80,
        backgroundcolor: '#FF5733',
        paddingHorizontal: 140,
        paddingVertical: 10,
        borderRadius: 30,
    },
});