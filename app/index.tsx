import { Link, Stack } from 'expo-router';
import { View } from '../components/Themed';
import React, { useState, useEffect } from 'react';
import tw from 'twrnc';
import { z } from 'zod';
import { useUser } from "@clerk/clerk-expo";
import CreateStoreModal from '../components/CreateStore';
import SignIn from './sign-in';
import { ActivityIndicator, Pressable, useColorScheme } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '../constants/Colors';


const store = z.object({
    id: z.number(),
    name: z.string().length(255),
    address: z.string().length(255),
    city: z.string().length(255),
    state: z.string().length(255),
    zipcode: z.string().length(10),
    created_at: z.date(),
});

export default function HomeScreen() {
    const [stores, setStores] = useState<z.infer<typeof store>[]>([])
    const { isLoaded, isSignedIn, user } = useUser();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const colorScheme = useColorScheme();

    useEffect(() => {
        const abortController = new AbortController();

        if (isSignedIn) {
            try {
                fetch(`http://192.168.237.191:3333/stores?user_id=${user.id}`, { signal: abortController.signal })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Success:', data);
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
            } catch (error) {
                console.error(error)
            }
        }

        return () => {
            abortController.abort();
        };
    }, [])

    if (!isLoaded) {
        return (
            <View style={tw`w-full h-full justify-center items-center`}>
                <Stack.Screen options={{
                    title: 'Sign In',
                }} />
                <ActivityIndicator size={'large'} animating color={colorScheme === 'dark' ? 'white' : 'black'} />
            </View>
        )
    }

    if (!isSignedIn) {
        return (
            <>
                <SignIn />
            </>
        )
    }

    return (
        <View style={tw`w-full h-full justify-center items-center`}>
            <Stack.Screen options={{
                title: 'Home',
                headerBackButtonMenuEnabled: false,
                headerRight: () => (
                    <View style={tw`flex-row gap-4 items-center justify-center bg-transparent`}>
                        <Link href="/" asChild>
                            <Pressable>
                                {({ pressed }) => (
                                    <FontAwesome
                                        name="connectdevelop"
                                        size={30}
                                        color={Colors[colorScheme ?? 'light'].text}
                                        style={tw.style('mr-4', {
                                            'opacity-50': pressed
                                        })}
                                    />
                                )}
                            </Pressable>
                        </Link>
                        <Link href="/" asChild>
                            <Pressable>
                                {({ pressed }) => (
                                    <FontAwesome
                                        name="shopping-basket"
                                        size={30}
                                        color={Colors[colorScheme ?? 'light'].text}
                                        style={tw.style('mr-4', {
                                            'opacity-50': pressed
                                        })}
                                    />
                                )}
                            </Pressable>
                        </Link>
                        <Pressable onPress={() => {
                            setIsModalVisible(true);
                        }}>
                            {({ pressed }) => (
                                <FontAwesome
                                    name="map"
                                    size={30}
                                    color={Colors[colorScheme ?? 'light'].text}
                                    style={tw.style('mr-4', {
                                        'opacity-50': pressed
                                    })}
                                />
                            )}
                        </Pressable>
                        <Link href="/map" asChild>
                            <Pressable>
                                {({ pressed }) => (
                                    <FontAwesome
                                        name="map"
                                        size={30}
                                        color={Colors[colorScheme ?? 'light'].text}
                                        style={tw.style('mr-4', {
                                            'opacity-50': pressed
                                        })}
                                    />
                                )}
                            </Pressable>
                        </Link>
                        {isSignedIn && <Link href={"/profile"} asChild>
                            <Pressable>
                                {({ pressed }) => (
                                    <FontAwesome
                                        name="apple"
                                        size={30}
                                        color={Colors[colorScheme ?? 'light'].text}
                                        style={tw.style('mr-4', {
                                            'opacity-50': pressed
                                        })}
                                    />
                                )}
                            </Pressable>
                        </Link>}
                        {!isSignedIn && <Link href={'/sign-in'} asChild>
                            <Pressable>
                                {({ pressed }) => (
                                    <FontAwesome
                                        name="sign-in"
                                        size={30}
                                        color={Colors[colorScheme ?? 'light'].text}
                                        style={tw.style('mr-4', {
                                            'opacity-50': pressed
                                        })}
                                    />
                                )}
                            </Pressable>
                        </Link>}
                    </View>
                ),
            }} />

            <CreateStoreModal isVisible={isModalVisible} onClose={() => setIsModalVisible(false)} >

            </CreateStoreModal>

        </View>
    );
}