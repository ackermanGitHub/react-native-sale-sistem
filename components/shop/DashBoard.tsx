import { Modal, Pressable, TouchableWithoutFeedback, TextInput, ScrollView } from 'react-native';
import { View, Text } from '../theme/Themed';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useState } from 'react'
import tw from '../utils/tailwind';
import { z } from 'zod';
import { ActivityIndicator, useColorScheme } from 'react-native';
import { useUser } from "@clerk/clerk-expo";

import { Stack, useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

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

    const [deleteStoreModal, setDeleteStoreModal] = useState(false);
    const [deleteStoreId, setDeleteStoreId] = useState(0);

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
            fetch('http://192.168.194.191:3333/store', {
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

    const deleteStore = async (store_id: number) => {
        if (isSignedIn) {
            setStores && setStores(stores.filter((store) => store.id === store_id ? false : true))
            setDeleteStoreModal(false)
            fetch('http://192.168.194.191:3333/store', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    store_id
                }),
            })
                .then(() => {
                })
                .catch(error => console.error(error))
                .finally(() => { })
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
                                                <View style={tw`w-full h-[70%] flex flex-row justify-between items-center`}>
                                                    <Text style={tw`text-xs`} >{store.name}</Text>
                                                </View>
                                                <View style={tw`w-full h-[30%] flex flex-row justify-between items-center`}>
                                                    <View></View>
                                                    <View style={tw`h-full w-full flex flex-row justify-end items-center`}>

                                                        <Pressable onPress={() => {
                                                            setDeleteStoreModal(true)
                                                            setDeleteStoreId(store.id)
                                                        }}>
                                                            {({ pressed }) => (
                                                                <FontAwesome
                                                                    name="trash-o"
                                                                    size={30}
                                                                    color={Colors[colorScheme ?? 'light'].text}
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
                            <View style={tw`w-full rounded-t-md px-5 flex-row justify-between items-center`}>
                                <Text style={tw`text-sm`}>Add Store</Text>
                                <Pressable onPress={() => setIsVisible(false)}>
                                    <MaterialIcons name="close" color={colorScheme === 'dark' ? 'white' : 'black'} style={tw`text-sm`} size={22} />
                                </Pressable>
                            </View>
                            {children}
                            <View style={tw`w-full justify-center items-center`}>
                                <View style={tw`w-4/5 bg-transparent mb-4 max-w-[320px]`}>
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
                                    : <View style={tw`my-12`} />
                                }
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Pressable>
            </Modal>


            <Modal animationType="fade" transparent visible={deleteStoreModal}>
                <Pressable onPress={() => {
                    setDeleteStoreModal(false)
                }} style={tw`h-full w-full flex relative bg-transparent`}>
                    <TouchableWithoutFeedback onPress={() => { }}>
                        <View style={tw`h-1/4 w-3/4 m-auto shadow-2xl border-slate-300 dark:border-slate-700 border-2 border-solid dark:shadow-slate-300 rounded-xl overflow-hidden`}>
                            <View style={tw`h-full px-5 flex-col justify-between items-center`}>
                                <View style={tw`w-full h-[70%] px-5 flex-col justify-center items-center`}>

                                    <Text style={tw`text-sm`}>Lorem ipsum dolor sit amet consectetur adipisicing elit.</Text>
                                </View>
                                <View style={tw`w-full h-[30%] px-5 flex-row justify-between items-center`}>

                                    <View style={tw` px-5 flex-col justify-between items-center`}>

                                    </View>
                                    <View style={tw`px-5 flex-row justify-between items-center`} >

                                        <Pressable onPress={() => {
                                            deleteStore(deleteStoreId);
                                        }} style={tw`mr-5 min-w-[80px] max-w-[140px] bg-blue-500 dark:bg-slate-700 rounded h-10 justify-center items-center`}>
                                            <Text style={tw`text-white`}>Ok</Text>
                                        </Pressable>
                                        <Pressable onPress={() => setDeleteStoreModal(false)} style={tw`min-w-[80px] max-w-[140px] bg-blue-500 dark:bg-slate-700 rounded h-10 justify-center items-center`}>
                                            <Text style={tw`text-white`}>Cancelar</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Pressable>
            </Modal>
        </View>
    );
}