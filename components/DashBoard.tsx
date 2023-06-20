import { Modal, Pressable, TouchableWithoutFeedback, TextInput, ScrollView } from 'react-native';
import { View, Text } from './Themed';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useState } from 'react'
import tw from './utils/tailwind';
import { z } from 'zod';
import { ActivityIndicator, useColorScheme } from 'react-native';
import { useUser } from "@clerk/clerk-expo";
import { FlashList } from "@shopify/flash-list";

import { Stack, useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../constants/Colors';

export const store = z.object({
    id: z.number(),
    name: z.string().length(255),
    address: z.string().length(255),
    city: z.string().length(255),
    state: z.string().length(255),
    zipcode: z.string().length(10),
    created_at: z.date(),
});

interface StoresDashboardProps {
    stores: z.infer<typeof store>[],
    children?: React.ReactNode,
    setStores: (stores: z.infer<typeof store>[]) => void
}

export const StoresDashboard: React.FC<StoresDashboardProps> = ({ stores, children, setStores }) => {
    const colorScheme = useColorScheme();
    const [isVisible, setIsVisible] = useState(false);
    const { isLoaded, isSignedIn, user } = useUser();

    const router = useRouter();

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [position, setPosition] = useState('');
    const [password, setPassword] = useState('');
    const [isLoadind, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const addStore = async () => {
        if (isSignedIn) {
            setIsLoading(true)
            fetch('http://192.168.80.191:3333/store', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: user.id,
                    name: name,
                    address: 'unknown',
                    city: 'unknown',
                    state: 'unknown',
                    zipcode: '12345',
                }),
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setStores && setStores([...stores, data])
                    setIsVisible(false)
                })
                .catch(error => console.error(error))
                .finally(() => {
                    setIsLoading(false)
                })
        }
    }

    return (
        <View style={tw`h-full w-full flex relative bg-transparent`}>
            <View style={tw.style(`w-16 h-16 z-20 shadow-lg border-slate-300 dark:border-slate-700 border-2 border-solid dark:shadow-slate-300 rounded-full absolute bottom-10 right-10 justify-center items-center`)}>
                <View style={tw.style(`w-16 h-16 rounded-full bg-transparent justify-center items-center`)}>
                    <Pressable onPress={() => {
                        setIsVisible(true)
                    }}>
                        <Text style={tw`text-4xl`} >+</Text>
                    </Pressable>
                </View>
            </View>

            <View style={tw`w-full m-0 h-full flex flex-row justify-center items-start content-center flex-wrap`}>
                <ScrollView >


                    {
                        stores.map((store) => {
                            return (
                                <View key={store.id} style={tw.style('w-[320px] relative border-slate-300 dark:border-slate-700 border-2 border-solid min-[420px]:w-64 min-[580px]:w-32 h-36 my-8 mx-auto rounded-2xl justify-center items-center shadow-md ')} >
                                    <Pressable style={tw`w-full h-full p-6`} onPress={() => {
                                        console.log()
                                    }}>

                                        {({ pressed }) => (
                                            <>
                                                <View style={tw`w-full h-[80%] flex flex-row justify-between items-center`}>
                                                    <Text style={tw`text-xs`} >{store.name}</Text>
                                                </View>
                                                <View style={tw`w-full h-[20%] flex flex-row justify-between items-center`}>
                                                    <View></View>
                                                    <View style={tw`h-full flex flex-row justify-between items-center`}>

                                                        <Pressable style={tw`h-[20%] p-6 z-20`} onPress={() => {
                                                            router.push('/deleteStoreModal')
                                                        }}>
                                                            {({ pressed }) => (
                                                                <FontAwesome
                                                                    name="trash"
                                                                    size={30}
                                                                    color={colorScheme === 'dark' ? "#B31312" : "#CA3E47"}
                                                                    style={tw.style('mr-4', {
                                                                        'opacity-50': pressed
                                                                    })}
                                                                />
                                                            )}
                                                        </Pressable>
                                                        <Pressable style={tw`h-[20%] p-6 z-20`} onPress={() => {
                                                            router.push('/deleteStoreModal')
                                                        }}>
                                                            {({ pressed }) => (
                                                                <FontAwesome
                                                                    name="trash"
                                                                    size={30}
                                                                    color={colorScheme === 'dark' ? "#B31312" : "#CA3E47"}
                                                                    style={tw.style('mr-4', {
                                                                        'opacity-50': pressed
                                                                    })}
                                                                />
                                                            )}
                                                        </Pressable>
                                                    </View>

                                                </View>

                                            </>
                                        )}
                                    </Pressable>
                                </View>
                            )
                        })
                    }
                </ScrollView>
            </View>
            {/* <FlashList
                data={stores}
                contentContainerStyle={tw`bg-slate-400`}
                renderItem={({item}) => <Text>{item.name}</Text>}
                estimatedItemSize={200}
            /> */}

            <Modal animationType="slide" transparent visible={isVisible}>
                <Pressable onPress={() => setIsVisible(false)} style={tw`h-full w-full flex justify-center items-center relative bg-transparent`}>
                    <TouchableWithoutFeedback onPress={() => { }}>
                        <View style={tw`h-1/3 w-full shadow-2xl rounded-t-xl justify-center items-center absolute bottom-0`}>
                            <View style={tw`h-[16%] w-full rounded-t-md px-5 flex-row justify-between items-center`}>
                                <Text style={tw`text-sm`}>Add Store</Text>
                                <Pressable onPress={() => setIsVisible(false)}>
                                    <MaterialIcons name="close" color={colorScheme === 'dark' ? 'white' : 'black'} style={tw`text-sm`} size={22} />
                                </Pressable>
                            </View>
                            {children}
                            <View style={tw`w-full h-[84%] justify-center items-center`}>
                                <View style={tw`w-4/5 mb-4 max-w-[320px]`}>
                                    <Text style={tw`text-red-500 text-xs`}>
                                        {error && error}
                                    </Text>
                                    <TextInput
                                        style={tw`h-12 px-4 border rounded border-gray-300 dark:text-white dark:bg-gray-800 dark:border-gray-700`}
                                        placeholder="Name..."
                                        autoCapitalize="none"
                                        placeholderTextColor={colorScheme === 'dark' ? "white" : "gray"}
                                        onChangeText={setName}
                                        value={name}
                                    />
                                </View>
                                {/* <View style={tw`w-4/5 mb-4 max-w-[320px]`}>
                                    <TextInput
                                        style={tw`h-12 px-4 border rounded border-gray-300 dark:text-white dark:bg-gray-800 dark:border-gray-700`}
                                        placeholder="Password..."
                                        secureTextEntry={true}
                                        placeholderTextColor={colorScheme === 'dark' ? "white" : "gray"}
                                        onChangeText={setPassword}
                                        value={password}
                                    />
                                </View> */}
                                <Pressable onPress={addStore} style={tw`w-4/5 max-w-[240px] bg-blue-500 dark:bg-slate-700 rounded h-12 justify-center items-center active:scale-50`}>
                                    <Text style={tw`text-white`}>Add Store</Text>
                                </Pressable>
                                {/* <Pressable style={tw`my-2`} onPress={() => router.replace('/modal')}>
                                    <Text style={tw`text-[#2e78b7] text-xs`}>This is a Label</Text>
                                </Pressable> */}
                                {isLoadind ?
                                    <ActivityIndicator style={tw`my-8`} size={'small'} animating color={colorScheme === 'dark' ? 'white' : 'black'} />
                                    : <View style={tw`my-10`} />
                                }
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Pressable>
            </Modal>
        </View>
    );
}