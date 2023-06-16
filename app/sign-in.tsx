import React, { useState } from 'react';
import { View, TextInput, Pressable, Text } from 'react-native';
import tw from 'twrnc';
import { useSignIn } from "@clerk/clerk-expo";
import { Link, Stack, useRouter } from 'expo-router';

export default function SignIn() {
    const { signIn, setActive, isLoaded } = useSignIn();
    const router = useRouter();

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
            router.push('/profile')
        } catch (err: any) {
            console.error(JSON.stringify(err, null, 2));
        }
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
                    placeholder="Email..."
                    autoCapitalize="none"
                    onChangeText={setEmail}
                    value={email}
                />
            </View>
            <View style={tw`w-4/5 mb-4`}>
                <TextInput
                    style={tw`h-12 px-4 border rounded`}
                    placeholder="Password..."
                    secureTextEntry={true}
                    onChangeText={setPassword}
                    value={password}
                />
            </View>
            <Pressable onPress={handleSignIn} style={tw`w-4/5 bg-blue-500 rounded h-12 justify-center items-center`}>
                <Text style={tw`text-white`}>Sign In</Text>
            </Pressable>
            <Link style={tw`my-2`} href="/sign-up">
                <Text style={tw`text-[#2e78b7] text-xs`}>Don't have an account?, Sign Up</Text>
            </Link>
        </View>
    );
}