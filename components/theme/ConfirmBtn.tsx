import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
const ConfirmBtn = ({ handlePress }: { handlePress: (arg0: string) => void }) => {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <TouchableOpacity style={[styles.button, styles.cancelBtn]} onPress={() => handlePress("Cancelar")}>
                    <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.confirmBtn]} onPress={() => handlePress("Confirmar")}>
                    <Text style={styles.buttonText}>Confirmar</Text>
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
        height: '100px',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
    },
    button: {
        margin: 5,
        padding: 10,
        backgroundColor: 'orange',
        borderRadius: 5,
        textAlign: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    confirmBtn: {
        backgroundColor: 'green',
    },
    cancelBtn: {
        backgroundColor: 'red',
    },
});
export default ConfirmBtn;