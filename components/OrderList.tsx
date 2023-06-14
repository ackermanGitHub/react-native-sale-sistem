import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import tw from 'twrnc';

const OrderList = () => {
    const [orders, setOrders] = useState<string[]>([]);
    const [ws, setWs] = useState<WebSocket | null>(null);

    const handleWebSocketMessage = (event: MessageEvent) => {
        console.log(event.data)
        setOrders((prevOrders) => [...prevOrders, event.data]);
    };
    useEffect(() => {
        const ws = new WebSocket("ws://192.168.231.191:3333", 'ordersReciever');
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
        <View style={tw`p-4 border-b-[1px] border-b-gray-400`}>
            <Text style={tw`text-base`}>{item}</Text>
        </View>
    );
    return (
        <View style={tw`flex-1 bg-[#fff] items-center justify-center overflow-scroll`}>
            <FlatList
                data={orders}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
            <TouchableOpacity style={tw`m-1 bg-[#ddd] rounded-md p-2 justify-center items-center`} onPress={() => {
                console.log(orders)
            }}>
                <Text style={tw`text-lg`}>console.log(orders)</Text>
            </TouchableOpacity>
        </View>
    );
};

export default OrderList;