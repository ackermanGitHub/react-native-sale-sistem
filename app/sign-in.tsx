import React, { useState } from 'react';
import { TextInput, Pressable, useColorScheme } from 'react-native';
import { View, Text } from '../components/Themed';
import tw from 'twrnc';
import { useSignIn } from "@clerk/clerk-expo";
import { Stack, useRouter } from 'expo-router';

export default function SignIn() {
    const { signIn, setActive, isLoaded } = useSignIn();
    const router = useRouter();
    const colorScheme = useColorScheme();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = async () => {
        if (!isLoaded) {
            return;
        }

        try {
            const completeSignIn = await signIn.create({
                identifier: email.trim(),
                password,
            });
            // This is an important step,
            // This indicates the user is signed in
            await setActive({ session: completeSignIn.createdSessionId });
            router.replace('/profile')
        } catch (err: any) {
            console.error(JSON.stringify(err, null, 2));
        }
    }

    return (
        <View style={tw`flex-1 justify-center items-center`}>
            <Stack.Screen options={{
                title: 'Sign In',
            }} />
            <View style={tw`w-4/5 mb-4 max-w-[320px]`}>
                <TextInput
                    style={tw`h-12 px-4 border rounded border-gray-300 dark:text-white dark:bg-gray-800 dark:border-gray-700`}
                    placeholder="Email..."
                    autoCapitalize="none"
                    placeholderTextColor={colorScheme === 'dark' ? "white" : "gray"}
                    onChangeText={setEmail}
                    value={email}
                />
            </View>
            <View style={tw`w-4/5 mb-4 max-w-[320px]`}>
                <TextInput
                    style={tw`h-12 px-4 border rounded border-gray-300 dark:text-white dark:bg-gray-800 dark:border-gray-700`}
                    placeholder="Password..."
                    secureTextEntry={true}
                    placeholderTextColor={colorScheme === 'dark' ? "white" : "gray"}
                    onChangeText={setPassword}
                    value={password}
                />
            </View>
            <Pressable onPress={handleSignIn} style={tw`w-4/5 max-w-[240px] bg-blue-500 dark:bg-slate-700 rounded h-12 justify-center items-center`}>
                <Text style={tw`text-white`}>Sign In</Text>
            </Pressable>
            <Pressable style={tw`my-2`} onPress={() => router.replace('/sign-up')}>
                <Text style={tw`text-[#2e78b7] text-xs`}>Don't have an account? Sign Up</Text>
            </Pressable>
        </View>
    );
}