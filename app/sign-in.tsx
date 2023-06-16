import React, { useEffect, useState } from 'react';
import { View, TextInput, Pressable, Text } from 'react-native'
import { StatusBar } from 'expo-status-bar';;
import tw from 'twrnc';
import { Link, Stack } from 'expo-router';

export default function SignIn() {

    useEffect(() => {
        NavigationBar.setBackgroundColorAsync("white");

        return () => {
            NavigationBar.setBackgroundColorAsync("#E5E5CB");

        }

    }, [])
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSignIn = () => {
        // Handle sign in logic here
    }
    return (
        <View style={tw`flex-1 justify-center items-center bg-[#E5E5CB]`}>
            <Stack.Screen options={{
                title: 'Sign In',
                headerStyle: {
                    backgroundColor: '#E5E5CB',
                }
            }} />
            <View style={tw`w-4/5 mb-4`}>
                <TextInput
                    style={tw`h-12 px-4 border rounded`}
                    placeholder="Email"
                    onChangeText={setEmail}
                    value={email}
                />
            </View>
            <View style={tw`w-4/5 mb-4`}>
                <TextInput
                    style={tw`h-12 px-4 border rounded`}
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={setPassword}
                    value={password}
                />
            </View>
            <Pressable onPress={handleSignIn} style={tw`w-4/5 bg-blue-500 rounded h-12 justify-center items-center`}>
                <Text style={tw`text-white`}>Sign In</Text>
            </Pressable>
            <StatusBar style={'dark'} backgroundColor='white' />
        </View>
    );
}