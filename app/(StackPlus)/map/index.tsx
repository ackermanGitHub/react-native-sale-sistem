import React from 'react';
import { View } from '../../../components/Themed';
import tw from '../../../components/utils/tailwind';
import MapView from '../../../components/MapView';
import { MainHeader } from '../../../components/MainHeader';

export default function MapViewRoute() {
    return (
        <View style={tw`w-full h-full `} >
            <MainHeader modalTitle='MainHeader' withModal stackTitle='Map' />
            <MapView />
        </View>
    );
}