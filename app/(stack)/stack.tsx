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
                <AnimatedButton onPress={() => {
                    router.push('/(stack)/map/')
                }} style={tw`w-[150px] max-w-[180px] bg-slate-500 dark:bg-slate-700 rounded h-8 justify-center items-center`} >
                    <Text style={tw`text-white`}>Map</Text>
                </AnimatedButton>
                <AnimatedButton onPress={() => {
                    router.push('/(stack)/map/demo')
                }} style={tw`w-[150px] max-w-[180px] bg-slate-500 dark:bg-slate-700 rounded h-8 justify-center items-center`} >
                    <Text style={tw`text-white`}>Map Demo</Text>
                </AnimatedButton>
                <AnimatedButton onPress={() => {
                    router.push('/(stack)/map/snack')
                }} style={tw`w-[150px] max-w-[180px] bg-slate-500 dark:bg-slate-700 rounded h-8 justify-center items-center`} >
                    <Text style={tw`text-white`}>Map Snack</Text>
                </AnimatedButton>
                <AnimatedButton onPress={() => {
                    router.push('/(stack)/map/snackClass')
                }} style={tw`w-[150px] max-w-[180px] bg-slate-500 dark:bg-slate-700 rounded h-8 justify-center items-center`} >
                    <Text style={tw`text-white`}>Map Snack Class</Text>
                </AnimatedButton>
                <AnimatedButton onPress={() => {
                    router.push('location')
                }} style={tw`w-[150px] max-w-[180px] bg-slate-500 dark:bg-slate-700 rounded h-8 justify-center items-center`} >
                    <Text style={tw`text-white`}>Location</Text>
                </AnimatedButton>
                <AnimatedButton onPress={() => {
                    router.push('accelerometer')
                }} style={tw`w-[150px] max-w-[180px] bg-slate-500 dark:bg-slate-700 rounded h-8 justify-center items-center`} >
                    <Text style={tw`text-white`}>Accelelometer</Text>
                </AnimatedButton>
                <AnimatedButton onPress={() => {
                    router.push('/(shop)/')
                }} style={tw`w-[150px] max-w-[180px] bg-slate-500 dark:bg-slate-700 rounded h-8 justify-center items-center`} >
                    <Text style={tw`text-white`}>Shop</Text>
                </AnimatedButton>
                <AnimatedButton onPress={() => {
                    router.push('/bottomModal')
                }} style={tw`w-[150px] max-w-[180px] bg-slate-500 dark:bg-slate-700 rounded h-8 justify-center items-center`} >
                    <Text style={tw`text-white`}>Bottom Modal</Text>
                </AnimatedButton>
                <AnimatedButton onPress={() => {
                    router.push('/slider')
                }} style={tw`w-[150px] max-w-[180px] bg-slate-500 dark:bg-slate-700 rounded h-8 justify-center items-center`} >
                    <Text style={tw`text-white`}>Slider</Text>
                </AnimatedButton>
            </View>
        </View>
    );
}