import React, { useEffect } from 'react';
import {
    Image,
    Dimensions,
    useColorScheme,
    ActivityIndicator,
    useWindowDimensions,
    Button,
} from "react-native";
import tw from '../../components/utils/tailwind';


import { View, Text } from '../../components/theme/Themed';
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

import { useRouter } from 'expo-router';

import { useUser } from '@clerk/clerk-expo';

import Profile from '../../app/(auth)/profile';


Image.prefetch("https://i.imgur.com/sNam9iJ.jpg")

const { width, height } = Dimensions.get("window");


const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;

type UserRole = 'taxi' | 'client'


import { createDrawerNavigator, DrawerNavigationProp } from '@react-navigation/drawer';
import { AnimatedButton } from '../theme/AnimatedBtn';
import SignInComponent from '../layout/SignInComponent';
import MapViewSnack from './MapViewSnack';
import StackRoute from '../../app/(stack)/stack';

import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

const Drawer = createDrawerNavigator();

export default function HomeMapRoute() {
    const dimensions = useWindowDimensions();

    const isLargeScreen = dimensions.width >= 768;

    const { user, isLoaded, isSignedIn } = useUser();

    const colorScheme = useColorScheme();

    const router = useRouter()

    return (
        <Drawer.Navigator screenOptions={{
            drawerItemStyle: tw`w-full p-0 m-0`,
            drawerStyle: [{
                borderRightColor: colorScheme === 'dark' ? '#333333' : '#999999',
                borderRightWidth: 1,
                borderBottomColor: colorScheme === 'dark' ? '#333333' : '#999999',
                borderBottomWidth: 1,
                width: isLargeScreen ? width - (width / 4) : width - (width / 2),
            }, tw`bg-white dark:bg-black`],
            drawerType: isLargeScreen ? 'permanent' : 'back',
            overlayColor: 'transparent',
            headerTintColor: colorScheme === 'light' ? 'black' : 'white',

        }} initialRouteName="Map" >
            <Drawer.Screen options={{
                drawerLabel: ({ focused, color, }) => {

                    if (!isLoaded) {
                        return (
                            <View style={tw`w-full flex-row justify-between items-center bg-transparent px-5 gap-5`}>
                                <ActivityIndicator size={'large'} animating color={colorScheme === 'dark' ? 'white' : 'black'} />
                                <View></View>
                            </View>
                        )
                    }

                    if (!isSignedIn) {
                        return (
                            <View style={tw`w-full mb-2 flex-row justify-between items-center bg-transparent gap-5`}>
                                <FontAwesome
                                    name={colorScheme === 'light' ? 'user-circle' : 'user-circle-o'}
                                    size={30}
                                    color={Colors[colorScheme ?? 'light'].text}
                                />
                                <AnimatedButton onPress={() => {

                                }} style={tw`w-[100px] max-w-[150px] bg-slate-500 dark:bg-slate-700 rounded h-8 justify-center items-center`} >
                                    <Text style={tw`text-white`}>Sign In</Text>
                                </AnimatedButton>
                            </View>
                        )
                    }

                    return (
                        <View style={tw`w-full mb-2 flex-row justify-between items-center bg-transparent gap-5`}>
                            <Image source={{
                                uri: user.imageUrl
                            }} style={tw`w-8 h-8 rounded-full`} />
                            <Text>{user.firstName + ' ' + user.lastName}</Text>
                        </View>
                    )
                },

            }} name="Sesión" component={isSignedIn ? Profile : SignInComponent} />
            <Drawer.Screen options={{

                drawerLabel: ({ focused, color, }) => {
                    return (
                        <View style={tw`w-full mb-2 flex-row justify-center items-center bg-transparent gap-5`}>
                            <Ionicons
                                name={colorScheme === 'light' ? 'md-map-outline' : 'md-map'}
                                size={30}
                                color={Colors[colorScheme ?? 'light'].text}
                            />
                            <Text>Mapa</Text>
                        </View>
                    )
                },

                /* drawerIcon: ({ focused, color }) => {
                    return (
                        <View style={tw`w-full my-2 flex-row justify-between items-center bg-transparent`}>
                            <Text>Map</Text>
                        </View>
                    )
                }, */
            }} name="Map" component={MapViewSnack} />
            <Drawer.Screen options={{
                /* drawerLabel: ({ focused, color }) => {
                    return (
                        <View style={tw`w-full my-2 flex-row justify-between items-center bg-transparent`}>
                            <Text>Features</Text>
                        </View>
                    )
                }, */
            }} name="Stack" component={StackRoute} />
        </Drawer.Navigator>
    );
}