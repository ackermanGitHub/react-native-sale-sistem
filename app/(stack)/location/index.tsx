import React from 'react';
import LocationComponent from '../../../components/mapping/Location';
import { MainHeader } from '../../../components/headers/MainHeader';
import { View } from '../../../components/theme/Themed';
import tw from '../../../components/utils/tailwind';

export default function LocationScreen() {
    return (
        <View style={tw`w-full h-full`} >
            <MainHeader modalTitle='MainHeader' withModal stackTitle='Location' />
            <LocationComponent />
        </View>
    );
}