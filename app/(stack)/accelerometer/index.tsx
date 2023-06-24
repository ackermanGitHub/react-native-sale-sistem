import React from 'react';
import { View } from '../../../components/theme/Themed';
import tw from '../../../components/utils/tailwind';
import AccelerometerComponent from '../../../components/stack/Accelerometer';

export default function AccelerometerRoute() {
    return (
        <View style={tw`w-full h-full`} >
            <AccelerometerComponent />
        </View>
    );
}