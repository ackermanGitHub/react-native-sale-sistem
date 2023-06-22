import { Link, Stack, router } from 'expo-router';
import { Text, View } from '../components/Themed';
import React, { useState, useEffect } from 'react';
import tw from '../components/utils/tailwind';
import { z } from 'zod';
import { useUser } from "@clerk/clerk-expo";
import { CreateStoreModal } from '../components/CreateStore';
import SignIn from './(auth)/sign-in';
import { ActivityIndicator, Pressable, useColorScheme } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '../constants/Colors';
import { MainHeader } from '../components/MainHeader';
import { ModalContainer } from '../components/ModalContainer';
import { StoresDashboard, store } from '../components/DashBoard';
import { AnimatedButton } from '../components/AnimatedBtn';

export default function HomeScreen() {
    const [stores, setStores] = useState<z.infer<typeof store>[]>([])
    const { isLoaded, isSignedIn, user } = useUser();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const colorScheme = useColorScheme();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const abortController = new AbortController();

        if (isSignedIn) {
            try {
                fetch(`http://192.168.7.191:3333/stores?user_id=${user.id}`, { signal: abortController.signal })
                    .then(response => response.json())
                    .then(data => {
                        setStores(data)
                        console.log('Success:', data);
                    })
                    .catch((error) => {
                        setError(error.errors[0].message)
                        console.error('Error:', error);
                    });
            } catch (error) {
                console.error(error)
            }
        }

        return () => {
            abortController.abort();
        };
    }, [isSignedIn])

    if (!isLoaded) {
        return (
            <View style={tw`w-full h-full justify-center items-center`}>
                <Stack.Screen options={{
                    title: ''
                }} />
                <ActivityIndicator size={'large'} animating color={colorScheme === 'dark' ? 'white' : 'black'} />
            </View>
        )
    }

    if (!isSignedIn && false) {
        return (
            <>
                <SignIn />
            </>
        )
    }

    return (
        <View style={tw`w-full h-full justify-center items-center`}>
            <MainHeader modalTitle='MainHeader' withModal withMap withSlider />


            {
                (!stores || stores.length === 0) && isSignedIn && isLoaded && (
                    <View style={tw.style(`w-full h-full flex flex-col justify-center items-center`)}>
                        <ActivityIndicator size={'large'} animating color={colorScheme === 'dark' ? 'white' : 'black'} />
                    </View>
                )
            }

            {
                !isSignedIn && (
                    <>
                        <SignIn />
                        {/* <View style={tw.style(`w-full h-full flex flex-col justify-center items-center gap-10`)}>
                            <Text style={tw.style(`mx-auto flex flex-row justify-center items-center`)}>
                                Sign In to see your stores
                            </Text>
                        
                            <AnimatedButton onPress={() => router.push('/sign-in')} style={tw`w-[180px] max-w-[240px] bg-blue-500 dark:bg-slate-700 rounded h-12 justify-center items-center`} >
                                <Text style={tw`text-white`}>Sign In</Text>
                            </AnimatedButton>
                        </View> */}
                    </>
                )
            }

            {isSignedIn && (stores && stores.length > 0) && <StoresDashboard setStores={setStores} stores={stores} />}
        </View>
    );
}