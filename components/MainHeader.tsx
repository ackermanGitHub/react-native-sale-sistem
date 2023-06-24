import { Link, Stack } from 'expo-router';
import { View } from '../components/Themed';
import React, { useState, useEffect } from 'react';
import tw from 'twrnc';
import { z } from 'zod';
import { useUser } from "@clerk/clerk-expo";
import { ModalContainer } from './ModalContainer';
import { ActivityIndicator, Pressable, useColorScheme } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '../constants/Colors';
import { StatusBar } from 'expo-status-bar'

const store = z.object({
    id: z.number(),
    name: z.string().length(255),
    address: z.string().length(255),
    city: z.string().length(255),
    state: z.string().length(255),
    zipcode: z.string().length(10),
    created_at: z.date(),
});

interface MainHeaderProps {
    withModal?: boolean;
    withMap?: boolean;
    withSlider?: boolean;
    withFeatures?: boolean;
    stackTitle?: string;
    modalTitle?: string;
    modalText?: string;
    modalCallback?: () => void;
    modalType?: string;
}

export const MainHeader: React.FC<MainHeaderProps> = ({ withModal = false, withMap = false, withSlider = false, withFeatures = false, stackTitle, modalTitle, modalText, modalCallback, modalType }) => {
    const [stores, setStores] = useState<z.infer<typeof store>[]>([])
    const { isLoaded, isSignedIn, user } = useUser();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const colorScheme = useColorScheme();

    return (
        <View style={tw`w-full justify-center items-center`}>
            <Stack.Screen options={{
                title: stackTitle || 'Home',
                headerBackButtonMenuEnabled: false,
                headerRight: () => (
                    <View style={tw`flex-row gap-4 items-center justify-center bg-transparent`}>
                        {withSlider && <Link href="/(features)/slider" asChild>
                            <Pressable>
                                {({ pressed }) => (
                                    <FontAwesome
                                        name="automobile"
                                        size={30}
                                        color={Colors[colorScheme ?? 'light'].text}
                                        style={tw.style('mr-4', {
                                            'opacity-50': pressed
                                        })}
                                    />
                                )}
                            </Pressable>
                        </Link>}
                        {withMap && <Link href="/map" asChild>
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
                        </Link>}
                        {withFeatures && <Link href="/stackplus" asChild>
                            <Pressable>
                                {({ pressed }) => (
                                    <FontAwesome
                                        name="code"
                                        size={30}
                                        color={Colors[colorScheme ?? 'light'].text}
                                        style={tw.style('mr-4', {
                                            'opacity-50': pressed
                                        })}
                                    />
                                )}
                            </Pressable>
                        </Link>}
                        {withModal && <Pressable onPress={() => {
                            setIsModalVisible(true);
                        }}>
                            {({ pressed }) => (
                                <FontAwesome
                                    name="arrow-up"
                                    size={30}
                                    color={Colors[colorScheme ?? 'light'].text}
                                    style={tw.style('mr-4', {
                                        'opacity-50': pressed
                                    })}
                                />
                            )}
                        </Pressable>}
                        <Link href={isSignedIn ? '/profile' : '/sign-in'} asChild>
                            <Pressable >
                                {({ pressed }) => (
                                    <FontAwesome
                                        name={isSignedIn ? 'user-circle' : 'sign-in'}
                                        size={30}
                                        color={Colors[colorScheme ?? 'light'].text}
                                        style={tw.style('mr-4', {
                                            'opacity-50': pressed,
                                        })}
                                    />
                                )}
                            </Pressable>
                        </Link>
                    </View>
                ),
            }} />

            {withModal && <ModalContainer title={modalTitle} text={modalText} callback={modalCallback} type={modalType} isVisible={isModalVisible} onClose={() => setIsModalVisible(false)} >
            </ModalContainer>}

        </View>
    );
}