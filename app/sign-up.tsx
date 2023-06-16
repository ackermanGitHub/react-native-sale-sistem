import React, { useState, useEffect } from 'react';
import { View, TextInput, Pressable, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { useSignUp } from "@clerk/clerk-expo";
import { Image } from 'expo-image';
import { Link, Stack, useRouter } from 'expo-router';
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";

export default function SignUp() {
    const { isLoaded, signUp, setActive } = useSignUp();
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [pendingVerification, setPendingVerification] = useState(false);
    const [code, setCode] = useState("");

    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

    useEffect(() => {
        void WebBrowser.warmUpAsync();
        return () => {
            void WebBrowser.coolDownAsync();
        };
    }, []);

    const handleSignUp = async () => {
        if (!isLoaded) {
            return;
        }

        try {
            await signUp.create({
                emailAddress: email.trim(),
                password,
            });

            // send the email.
            await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

            // change the UI to our pending section.
            setPendingVerification(true);
        } catch (err: any) {
            console.error(JSON.stringify(err, null, 2));
        }
    }

    const googleSignUpHandler = React.useCallback(async () => {
        try {
            const { createdSessionId, signIn, signUp, setActive } =
                await startOAuthFlow();

            if (createdSessionId && setActive) {
                setActive({ session: createdSessionId });
            } else {
                // Use signIn or signUp for next steps such as MFA
            }
        } catch (err) {
            console.error("OAuth error", err);
        }
    }, []);


    const handleVerifyEmail = async () => {
        if (!isLoaded) {
            return;
        }

        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification({
                code,
            });

            await setActive({ session: completeSignUp.createdSessionId });
            router.push('/profile');
        } catch (err: any) {
            console.error(JSON.stringify(err, null, 2));
        }
    };

    return (
        <View style={tw`flex-1 justify-center bg-[#E5E5CB] items-center`}>
            <Stack.Screen options={{
                title: 'Sign Up',
                headerStyle: {
                    backgroundColor: '#E5E5CB',
                }
            }} />
            <Image
                style={tw`w-20 h-20 mb-8`}
                source="./../assets/images/popeye-the-sailor-man-1.png"
                contentFit="contain"
                transition={1000}
            />
            {!pendingVerification && (
                <>
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
                </>
            )}
            {pendingVerification && (
                <View>
                    <View>
                        <TextInput
                            value={code}
                            placeholder="Code..."
                            onChangeText={(code) => setCode(code)}
                        />
                    </View>
                    <TouchableOpacity onPress={handleVerifyEmail}>
                        <Text>Verify Email</Text>
                    </TouchableOpacity>
                </View>
            )}
            <Pressable onPress={handleSignUp} style={tw`w-4/5 bg-blue-500 rounded h-12 justify-center items-center`}>
                <Text style={tw`text-white`}>Sign Up</Text>
            </Pressable>
            <Pressable onPress={googleSignUpHandler} style={tw`w-4/5 mt-4 bg-blue-500 rounded h-12 justify-center items-center`}>
                <Text style={tw`text-white`}>Sign with Google</Text>
            </Pressable>
            <Link style={tw`my-2`} href="/sign-in">
                <Text style={tw`text-[#2e78b7] text-xs`}>Do you have an account?, Sign In</Text>
            </Link>
        </View>
    );
}