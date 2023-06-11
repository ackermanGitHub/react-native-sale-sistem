import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
const OrderScreen = ({ order = 'Order' }) => {
    return (
        <View style={styles.container}>
            <View style={styles.screen}>
                <Text style={styles.screenText}>{order}</Text>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '15%',
    },
    screen: {
        flexDirection: 'row',
        alignContent: 'center',
        height: '80%',
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    screenText: {
        padding: 15,
        fontSize: 30,
        fontWeight: '400',
        textAlign: 'left',
        color: '#000',
    },
});
export default OrderScreen;