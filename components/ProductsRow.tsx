import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
const ProductsRow = ({ handlePress }: { handlePress: (arg0: string) => void }) => {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <TouchableOpacity style={styles.button} onPress={() => handlePress("Refresco")}>
                    <Text style={styles.buttonText}>Refresco</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => handlePress("Café")}>
                    <Text style={styles.buttonText}>Café</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => handlePress("Helado")}>
                    <Text style={styles.buttonText}>Helado</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.row}>
                <TouchableOpacity style={[styles.button, styles.largeBtn]} onPress={() => handlePress("PJ")}>
                    <Text style={styles.buttonText}>PJ</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.largeBtn]} onPress={() => handlePress("PJQ")}>
                    <Text style={styles.buttonText}>PJQ</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '25%',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        height: '50%',
        width: '100%',
    },
    button: {
        margin: 5,
        backgroundColor: 'orange',
        borderRadius: 5,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: '30%',
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    largeBtn: {
        fontSize: 20,
        fontWeight: 'bold',
        width: '46%',
    },
    confirmBtn: {
        backgroundColor: 'green',
    },
    cancelBtn: {
        backgroundColor: 'red',
    },
});
export default ProductsRow;