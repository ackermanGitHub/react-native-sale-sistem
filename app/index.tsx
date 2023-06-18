import { Stack } from 'expo-router';
import { View, Text } from '../components/Themed';
import React, { useState, useEffect } from 'react';
import tw from 'twrnc';
import { z } from 'zod';
import { useUser } from "@clerk/clerk-expo";
import CreateStoreModal from '../components/CreateStore';

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
            <View>
                <Text>
                    Loading...
                </Text>
            </View>
        )
    }

    if (!isSignedIn) {
        return (
            <View>
                <Text>
                    You are not signed in
                </Text>
            </View>
        )
    }

    return (
        <View style={tw`w-full h-full justify-center items-center`}>
            <Stack.Screen options={{
                title: 'Home',
                headerBackButtonMenuEnabled: false,
            }} />

            <CreateStoreModal isVisible={isModalVisible} onClose={() => setIsModalVisible(false)} >

            </CreateStoreModal>

        </View>
    );
}