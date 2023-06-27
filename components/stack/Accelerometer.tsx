import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text } from '../theme/Themed';
import { Accelerometer, AccelerometerMeasurement } from 'expo-sensors';
import tw from 'twrnc';

export default function AccelerometerComponent() {
    const [{ x, y, z }, setData] = useState<AccelerometerMeasurement>({
        x: 0,
        y: 0,
        z: 0,
    });
    const [subscription, setSubscription] = useState<any>();

    const _slow = () => Accelerometer.setUpdateInterval(2000);
    const _fast = () => Accelerometer.setUpdateInterval(1000);

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
        <View style={tw`w-full h-full justify-center items-center`}>
            <View style={tw`w-1/2`}>
                <Text style={tw`text-left`}>Accelerometer: (in gs where 1g = 9.81 m/s^2)</Text>
                <Text style={tw`text-left`}>x: {x}</Text>
                <Text style={tw`text-left`}>y: {y}</Text>
                <Text style={tw`text-left`}>z: {z}</Text>
            </View>
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