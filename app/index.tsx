import { Stack } from 'expo-router';
import { View } from '../components/Themed';
import React, { useState, useEffect } from 'react';
import tw from 'twrnc';


export default function HomeScreen() {

    return (
        <View style={tw`w-full h-full justify-center items-center`}>
            <Stack.Screen options={{
                title: 'Home',
                headerBackButtonMenuEnabled: false,
            }} />

            <View style={tw`w-full h-full m-20 justify-center items-center py-4`}>

            </View>

        </View>
    );
}