import React from 'react';
import { View } from '../../../components/theme/Themed';
import tw from '../../../components/utils/tailwind';
import { Stack } from 'expo-router';
import MapViewSnack from '../../../components/mapping/MapViewSnack';

export default function MapViewRoute() {
    return (
        <View style={tw`w-full h-full `} >
            <Stack.Screen options={{
                title: 'Map',
                header: () => <></>,
                navigationBarHidden: true
            }} />
            <MapViewSnack role='taxi' />
        </View>
    );
}