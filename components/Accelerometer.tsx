import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import tw from 'twrnc';

type typeData = { x: number, y: number, z: number }

export default function AccelerometerComponent() {
    const [{ x, y, z }, setData] = useState<typeData>({
        x: 0,
        y: 0,
        z: 0,
    });
    const [subscription, setSubscription] = useState<any>();

    Accelerometer

    const _slow = () => Accelerometer.setUpdateInterval(1000);
    const _fast = () => Accelerometer.setUpdateInterval(16);

    const _subscribe = () => {
        setSubscription(
            Accelerometer.addListener((newData) => { setData(newData) })
        );
    };

    const _unsubscribe = () => {
        subscription && subscription.remove();
        setSubscription(null);
    };

    useEffect(() => {
        _subscribe();
        return () => _unsubscribe();
    }, []);

    return (
        <View style={tw`w-full h-full justify-center`}>
            <Text style={tw`text-center`}>Accelerometer: (in gs where 1g = 9.81 m/s^2)</Text>
            <Text style={tw`text-center`}>x: {x}</Text>
            <Text style={tw`text-center`}>y: {y}</Text>
            <Text style={tw`text-center`}>z: {z}</Text>
            <View style={tw`flex-row items-center mt-4`}>
                <TouchableOpacity onPress={subscription ? _unsubscribe : _subscribe} style={tw`items-center justify-center bg-[#eee] p-3`}>
                    <Text>{subscription ? 'On' : 'Off'}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={_slow} style={tw`items-center justify-center bg-[#eee] p-3`}>
                    <Text>Slow</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={_fast} style={tw`items-center justify-center bg-[#eee] p-3`}>
                    <Text>Fast</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}