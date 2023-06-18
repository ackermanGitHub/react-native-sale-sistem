import React from 'react';
import MapView from 'react-native-maps';
import { View } from 'react-native';
import tw from 'twrnc';

export default function MapViewComponent() {
    return (
        <View style={tw`w-full h-full`}>
            <MapView style={tw`w-full h-full`} />
        </View>
    );
}