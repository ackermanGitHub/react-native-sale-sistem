import React from 'react';
import { View } from '../../../components/Themed';
import tw from '../../../components/utils/tailwind';
import MapView from '../../../components/MapView';
import { MainHeader } from '../../../components/MainHeader';
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