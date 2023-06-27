import React, { useEffect } from 'react';
import {
    Image,
    Dimensions,
    useColorScheme,
    ActivityIndicator,
    useWindowDimensions,
    Button,
    Pressable,
} from "react-native";
import tw from '../../components/utils/tailwind';


import { View, Text } from '../../components/theme/Themed';
import { AntDesign, Feather, FontAwesome, FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

import { useRouter } from 'expo-router';

import { useUser } from '@clerk/clerk-expo';

import Profile from '../../app/(auth)/profile';

import {
    DrawerContent,
    DrawerContentScrollView,
    DrawerItem,
    DrawerItemList,
    DrawerView,
} from '@react-navigation/drawer';

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
import HistoryScreen from './History';

const Drawer = createDrawerNavigator();

export default function HomeMapRoute() {
    const dimensions = useWindowDimensions();

    const isLargeScreen = dimensions.width >= 768;

    const { user, isLoaded, isSignedIn } = useUser();

    const colorScheme = useColorScheme();

    const router = useRouter()

    return (
        <Drawer.Navigator
            screenOptions={{
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
                header({ navigation }) {
                    return (
                        <Pressable onPress={() => {
                            navigation.openDrawer();
                        }}>
                            <AntDesign
                                style={tw`absolute top-9 left-8 p-3`}
                                name={'menuunfold'}
                                size={30}
                                color={Colors[colorScheme ?? 'light'].text}
                            />
                        </Pressable>
                    )
                },

            }}
            drawerContent={(props) => {
                const { descriptors, navigation, state } = props;
                return (
                    <DrawerContentScrollView {...props}>
                        {/* <DrawerItemList  {...props} /> */}
                        <DrawerItem style={tw`w-full p-0 m-0`} labelStyle={tw`w-full p-0 m-0`} icon={({ focused, color }) => {
                            if (!isLoaded) {
                                return (
                                    <View style={tw`w-full flex-row justify-between items-center bg-transparent px-5 gap-5`}>
                                        <ActivityIndicator
                                            size={'large'}
                                            animating
                                            color={colorScheme === 'dark' ? 'white' : 'black'}
                                        />
                                        <View></View>
                                    </View>
                                )
                            }

                            if (!isSignedIn) {
                                return (
                                    <View style={tw`w-full flex-row justify-between items-center bg-transparent px-5 gap-5`}>
                                        <FontAwesome
                                            name={colorScheme === 'light' ? 'user-circle' : 'user-circle-o'}
                                            size={30}
                                            color={Colors[colorScheme ?? 'light'].text}
                                        />
                                        <AnimatedButton onPress={() => {
                                            navigation.navigate('Session')
                                        }} style={tw`w-[100px] max-w-[150px] bg-slate-500 dark:bg-slate-700 rounded h-8 justify-center items-center`} >
                                            <Text style={tw`text-white`}>Sign In</Text>
                                        </AnimatedButton>
                                    </View>
                                )
                            }

                            return (
                                <View style={tw`w-full flex-row justify-between items-center bg-transparent pl-5`}>
                                    <Image source={{
                                        uri: user.imageUrl
                                    }} style={tw`w-8 h-8 rounded-full`} />
                                    <Text>{user.firstName + ' ' + user.lastName}</Text>
                                    <AnimatedButton onPress={() => {
                                        console.log('open modal user settings')
                                    }}  >
                                        <Feather
                                            name='more-vertical'
                                            size={20}
                                            color={Colors[colorScheme ?? 'light'].text}
                                        />
                                    </AnimatedButton>
                                </View>
                            )

                        }} label={'Session'} onPress={() => { }} />
                        <DrawerItem style={tw`w-full p-0 m-0`} labelStyle={tw`w-full p-0 m-0`} icon={({ focused, color, }) => {
                            return (
                                <View style={tw`w-full my-2 flex-row justify-start items-center bg-transparent`}>
                                    <Ionicons
                                        name={colorScheme === 'light' ? 'md-map-outline' : 'md-map'}
                                        size={30}
                                        color={Colors[colorScheme ?? 'light'].text}
                                        style={tw`ml-5`}
                                    />
                                    <Text style={tw`ml-5`}>Mapa</Text>
                                </View>
                            )
                        }} label={'Mapa'} onPress={() => { navigation.navigate('Map') }} />
                        <DrawerItem style={tw`w-full p-0 m-0`} labelStyle={tw`w-full p-0 m-0`} icon={({ focused, color }) => {
                            return (
                                <View style={tw`w-full my-2 flex-row justify-start items-center bg-transparent`}>
                                    <FontAwesome
                                        name='stack-overflow'
                                        size={30}
                                        color={Colors[colorScheme ?? 'light'].text}
                                        style={tw`ml-5`}
                                    />
                                    <Text style={tw`ml-5`}>Features</Text>
                                </View>
                            )
                        }} label={'Features'} onPress={() => { navigation.navigate('Stack') }} />
                        <DrawerItem style={tw`w-full p-0 m-0`} labelStyle={tw`w-full p-0 m-0`} icon={({ focused, color }) => {
                            return (
                                <View style={tw`w-full my-2 flex-row justify-start items-center bg-transparent`}>
                                    <MaterialIcons
                                        name='history'
                                        size={30}
                                        color={Colors[colorScheme ?? 'light'].text}
                                        style={tw`ml-5`}
                                    />
                                    <Text style={tw`ml-5`}>History</Text>
                                </View>
                            )
                        }} label={'History'} onPress={() => { navigation.navigate('History') }} />
                        <DrawerItem style={tw`w-full p-0 m-0`} labelStyle={tw`w-full p-0 m-0`} icon={() => (
                            <View style={tw`w-full p-0 m-0 flex-row justify-around items-center bg-transparent`}>
                                <AnimatedButton onPress={() => {
                                }}  >
                                    <AntDesign
                                        name='instagram'
                                        size={25}
                                        color={Colors[colorScheme ?? 'light'].text}
                                        style={tw``}
                                    />
                                </AnimatedButton><AnimatedButton onPress={() => {
                                }}  >
                                    <AntDesign
                                        name='facebook-square'
                                        size={25}
                                        color={Colors[colorScheme ?? 'light'].text}
                                        style={tw`ml-5`}
                                    />
                                </AnimatedButton><AnimatedButton onPress={() => {
                                }}  >
                                    <AntDesign
                                        name='twitter'
                                        size={25}
                                        color={Colors[colorScheme ?? 'light'].text}
                                        style={tw`ml-5`}
                                    />
                                </AnimatedButton>
                            </View>

                        )} label={'Social Networks'} onPress={() => { }} />
                    </DrawerContentScrollView>
                )
            }}
            initialRouteName="Map"
        >
            <Drawer.Screen
                options={{
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
                                <View style={tw`w-full mb-2 flex-row justify-between items-center bg-transparent px-5 gap-5`}>
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
                            <View style={tw`w-full mb-2 flex-row justify-between items-center bg-transparent px-5 gap-5`}>
                                <Image source={{
                                    uri: user.imageUrl
                                }} style={tw`w-8 h-8 rounded-full`} />
                                <Text>{user.firstName + ' ' + user.lastName}</Text>
                            </View>
                        )
                    },

                }} name="Session" component={isSignedIn ? Profile : SignInComponent} />
            <Drawer.Screen options={{

                drawerIcon: ({ focused, color, }) => {
                    return (
                        <View style={tw`w-full my-2 flex-row justify-start items-center bg-transparent`}>
                            <Ionicons
                                name={colorScheme === 'light' ? 'md-map-outline' : 'md-map'}
                                size={30}
                                color={Colors[colorScheme ?? 'light'].text}
                                style={tw`ml-5`}
                            />
                            <Text style={tw`ml-5`}>Map</Text>
                        </View>
                    )
                },
            }} name="Map" component={MapViewSnack} />
            <Drawer.Screen options={{
                drawerLabel: ({ focused, color }) => {
                    return (
                        <View style={tw`w-full my-2 flex-row justify-start items-center bg-transparent`}>
                            <FontAwesome
                                name='stack-overflow'
                                size={30}
                                color={Colors[colorScheme ?? 'light'].text}
                                style={tw`ml-5`}
                            />
                            <Text style={tw`ml-5`}>Features</Text>
                        </View>
                    )
                },
            }} name="Stack" component={StackRoute} />
            <Drawer.Screen options={{
                drawerLabel: ({ focused, color }) => {
                    return (
                        <View style={tw`w-full my-2 flex-row justify-start items-center bg-transparent`}>
                            <MaterialIcons
                                name='history'
                                size={30}
                                color={Colors[colorScheme ?? 'light'].text}
                                style={tw`ml-5`}
                            />
                            <Text style={tw`ml-5`}>History</Text>
                        </View>
                    )
                },
            }} name="History" component={HistoryScreen} />
        </Drawer.Navigator>
    );
}