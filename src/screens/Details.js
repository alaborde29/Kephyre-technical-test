import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DetailScreen({props}) {
    return (
        <View style={styles.genericView}>
            <Text 
                style={styles.genericText}
                onPress={() => props.navigate('HomeScreen')}
            >
                Details Screen Page
            </Text>
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
    }
})