import React, { useState, useEffect } from 'react';
// import { Platform } from 'react-native';
// import Device from 'expo-device';
import { Text, View } from '../theme/Themed';
import tw from '../utils/tailwind';

export default function CustomServiceScreen() {
    return (
        <View style={tw`w-full h-full p-5`}>
            <Text style={tw`text-lg text-center`}>Custom Service</Text>
        </View>
    );
} 