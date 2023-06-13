import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
const OrderList = () => {
    const [orders, setOrders] = useState<string[]>([]);
    const [ws, setWs] = useState<WebSocket | null>(null);

    const handleWebSocketMessage = (event: MessageEvent) => {
        console.log(event.data)
        setOrders((prevOrders) => [...prevOrders, event.data]);
    };
    useEffect(() => {
        const ws = new WebSocket("ws://192.168.49.191:3333", 'ordersReciever');
        setWs(ws);

        ws.addEventListener("open", (event) => {
            console.log('%c (ordersSender) Connection opened', 'background: orange; color: black;', event);
        });

        ws.addEventListener('message', handleWebSocketMessage);

        ws.addEventListener('close', (event) => {
            console.log('%c (ordersSender) Connection closed', 'background: orange; color: black;', event);
        });

        ws.addEventListener('error', (error) => {
            console.log('%c (ordersSender) WebSocket error', 'background: red; color: black;', error);
        });

        return () => {
            ws.removeEventListener("message", handleWebSocketMessage);
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
            <TouchableOpacity style={styles.button} onPress={() => {
                console.log(orders)
            }}>
                <Text style={styles.orderText}>1</Text>
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'scroll',
    },
    order: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    orderText: {
        fontSize: 16,
    },
    button: {
        margin: 5,
        width: '30%',
        backgroundColor: '#ddd',
        borderRadius: 5,
        textAlign: 'center',
        justifyContent: 'center',
    },
});
export default OrderList;