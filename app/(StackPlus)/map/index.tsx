import React from 'react';
import { View } from '../../../components/Themed';
import tw from 'twrnc';
import MapViewComponent from '../../../components/MapView';

export default function MapViewRoute() {
    return (
        <View style={tw`w-full h-full`} >
            <MapViewComponent />
        </View>
    );
}