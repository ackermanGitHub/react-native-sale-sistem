import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
const OrderList = () => {
    const [orders, setOrders] = useState<string[]>([]);
    useEffect(() => {
        const ws = new WebSocket('wss://websocketscustomdomain.up.railway.app', 'orderReceiver');
        ws.addEventListener('message', (event) => {
            setOrders((prevOrders) => [...prevOrders, event.data]);
        });
        return () => {
            ws.close();
        };
    }, []);
    const renderItem = ({ item = 'order' }) => (
        <View style={styles.order}>
            <Text style={styles.orderText}>{item}</Text>
        </View>
    );
    return (
        <View style={styles.container}>
            <FlatList
                data={orders}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    order: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    orderText: {
        fontSize: 16,
    },
});
export default OrderList;