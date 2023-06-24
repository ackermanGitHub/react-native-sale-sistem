import React from 'react';
import { View, Text } from '../../components/theme/Themed';
import tw from '../../components/utils/tailwind';
import { AnimatedButton } from '../../components/theme/AnimatedBtn';
import { useRouter } from 'expo-router';
import { Button } from 'react-native';

export default function StackRoute() {

    const router = useRouter();

    return (
        <View style={tw`w-full h-full justify-center items-center`} >
            <View style={tw`w-full h-full gap-8 justify-center items-center`}>
                <Button onPress={() => {
                    router.push('accelerometer')
                }} title='Accelelometer' />
                <Button onPress={() => {
                    router.push('location')
                }} title='Location' />
                <Button onPress={() => {
                    router.push('/(stack)/map/demo')
                }} title='Map' />
                <Button onPress={() => {
                    router.push('/(casher)/')
                }} title='Casher' />
                <Button onPress={() => {
                    router.push('/(stack)/map/snack')
                }} title='Snack' />
                <Button onPress={() => {
                    router.push('/(StackPlus)/map/functionSnack')
                }} title='Function Snack' />
            </View>
        </View>
    );
}