import React, { useState, useEffect } from 'react';
// import { Platform } from 'react-native';
// import Device from 'expo-device';
import { Text, View } from './Themed';
import * as Location from 'expo-location';
import tw from './utils/tailwind';

export default function LocationComponent() {
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            /* if (Platform.OS === 'android' && !Device.isDevice) {
                setErrorMsg(
                    'Oops, this will not work on Snack in an Android Emulator. Try it on your device!'
                );
                return;
            } */
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }

    return (
        <View style={tw`w-full h-full p-5`}>
            <Text style={tw`text-lg text-center`}>{text}</Text>
        </View>
    );
}