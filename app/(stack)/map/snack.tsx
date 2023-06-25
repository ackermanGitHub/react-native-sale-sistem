import React from 'react';
import { View } from '../../../components/theme/Themed';
import tw from '../../../components/utils/tailwind';
import { Stack } from 'expo-router';
import MapViewSnackComponent from '../../../components/mapping/MapViewSnack';

export default function MapViewSnackRoute() {
    return (
        <View style={tw`w-full h-full `} >
            <Stack.Screen options={{
                title: 'Map',
                header: () => <></>,
                navigationBarHidden: true
            }} />
            <MapViewSnackComponent role='taxi' />
        </View>
    );
}