import React from 'react';
import { View } from '../../../components/theme/Themed';
import tw from '../../../components/utils/tailwind';
import MapView from '../../../components/mapping/MapView';
import { MainHeader } from '../../../components/headers/MainHeader';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function MapViewRoute() {
    return (
        <View style={tw`w-full h-full `} >
            <Stack.Screen options={{
                title: 'Map',
                header: () => <></>,
                navigationBarHidden: true
            }} />
            <MapView />
        </View>
    );
}