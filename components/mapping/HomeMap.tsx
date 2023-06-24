import React from 'react';
import { View } from '../../components/theme/Themed';
import tw from '../../components/utils/tailwind';
import MapViewSnack from '../../components/mapping/MapViewSnack';

export default function MapViewRoute() {
    return (
        <View style={tw`w-full h-full `} >
            <MapViewSnack role='taxi' />
        </View>
    );
}