import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Home = (props) => {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <TouchableOpacity
            style={styles.pageButton}
            onPress={props.navigation.navigate("BikeFinder")}
        >
            <Text>BikeFinder</Text>
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

export default Home;

const styles = StyleSheet.create({
    pageButton: {
        marginTop: 80,
        backgroundcolor: '#FF5733',
        paddingHorizontal: 140,
        paddingVertical: 10,
        borderRadius: 30,
    },
});