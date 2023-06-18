import React from 'react';
import { View } from '../../../components/Themed';
import tw from 'twrnc';
import AccelerometerComponent from '../../../components/Accelerometer';

export default function AccelerometerRoute() {
    return (
        <View style={tw`w-full h-full`} >
            <AccelerometerComponent />
        </View>
    );
}