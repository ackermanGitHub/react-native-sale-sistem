import React from 'react';
import {
    Image,
    Dimensions,
    useColorScheme,
    ActivityIndicator,
    Pressable,
    Animated
} from "react-native";
import tw from '../../components/utils/tailwind';


import { View, Text } from '../../components/theme/Themed';
import { AntDesign, Feather, FontAwesome, FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

import { useRouter } from 'expo-router';

import { useUser } from '@clerk/clerk-expo';

import Profile from '../../app/(auth)/profile';

import {
    DrawerContentScrollView,
    DrawerItem,
} from '@react-navigation/drawer';

// Image.prefetch("https://i.imgur.com/sNam9iJ.jpg")
Image.prefetch("https://lh3.googleusercontent.com/a/AAcHTtfPgVic8qF8hDw_WPE80JpGOkKASohxkUA8y272Ow=s1000-c")

const { width, height } = Dimensions.get("window");


const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;

type UserRole = 'taxi' | 'client'


import { createDrawerNavigator } from '@react-navigation/drawer';
import { AnimatedButton } from '../theme/AnimatedBtn';
import SignInComponent from '../layout/SignInComponent';
import MapViewSnack from './MapViewSnack';
import StackRoute from '../../app/(stack)/stack';

import HistoryScreen from './History';
import usePressIn from '../../hooks/usePressIn';
import ConfigScreen from './Config';
import CustomServiceScreen from './CustomService';
import PaymentScreen from './Payment';

const Drawer = createDrawerNavigator();

export default function HomeMapRoute() {

    const isLargeScreen = width >= 768;

    const isSmallScreen = width <= 350;

    const { user, isLoaded, isSignedIn } = useUser();

    const colorScheme = useColorScheme();

    const router = useRouter()

    const { animatedValue: pressMenuAnim, handlePressIn: pressInMenu, handlePressOut: pressOutMenu, isPressed: isMenuPressed } = usePressIn()

    return (
        <Drawer.Navigator
            screenOptions={{
                drawerStyle: [{
                    width: isLargeScreen ? width - (width / 4) : width - (width / 2),
                }, tw`bg-white dark:bg-black`],
                drawerType: isLargeScreen ? 'permanent' : 'back',
                overlayColor: 'transparent',
                headerTintColor: colorScheme === 'light' ? 'black' : 'white',
                header({ navigation }) {
                    return (
                        <Animated.View
                            style={[
                                tw`absolute top-11 left-10`,
                                {
                                    transform: [
                                        {
                                            scale: pressMenuAnim
                                        }
                                    ]
                                },
                            ]}
                        >
                            <Pressable
                                onPressIn={() => {
                                    pressInMenu();
                                }}
                                onPressOut={() => {
                                    pressOutMenu();
                                }}
                                onPress={() => {
                                    navigation.openDrawer();
                                }}
                                style={tw`p-3 rounded-full bg-white dark:bg-black`}
                            >
                                <AntDesign
                                    name={'menuunfold'}
                                    size={30}
                                    color={Colors[colorScheme ?? 'light'].text}
                                />
                            </Pressable>
                        </Animated.View>
                    )
                },

            }}
            drawerContent={(props) => {
                const { descriptors, navigation, state } = props;
                return (
                    <DrawerContentScrollView contentContainerStyle={tw`h-full w-full relative`} {...props}>
                        {/* <DrawerItemList  {...props} /> */}
                        <DrawerItem style={tw`w-full p-0 m-0`} icon={({ focused, color }) => {
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
                                    <View style={tw`w-full flex-row justify-start items-center bg-transparent`}>
                                        <FontAwesome
                                            name={colorScheme === 'light' ? 'user-circle' : 'user-circle-o'}
                                            size={30}
                                            color={Colors[colorScheme ?? 'light'].text}
                                            style={tw`ml-5`}
                                        />
                                        <AnimatedButton onPress={() => {
                                            navigation.navigate('Session')
                                        }} style={tw`w-[60px] max-w-[120px] bg-slate-500 dark:bg-slate-700 rounded h-8 ml-5 justify-center items-center`} >
                                            <Text style={tw`text-white`}>Sign In</Text>
                                        </AnimatedButton>
                                    </View>
                                )
                            }

                            return (
                                <View style={tw`w-full justify-around flex-row items-center bg-transparent`}>
                                    <Image source={{
                                        uri: user.imageUrl
                                    }} style={[tw`w-8 h-8 rounded-full`]} />
                                    <Text>{user.firstName + ' ' + user.lastName}</Text>
                                    <AnimatedButton onPress={() => {
                                        console.log('open modal user settings')
                                    }}>
                                        <Feather
                                            name='more-vertical'
                                            size={20}
                                            color={Colors[colorScheme ?? 'light'].text}
                                        />
                                    </AnimatedButton>
                                </View>
                            )
                        }} label={'Session'} onPress={() => { }} />
                        <DrawerItem style={tw`w-full p-0 m-0`} icon={({ focused, color, }) => {
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
                        <DrawerItem style={tw`w-full p-0 m-0`} icon={({ focused, color }) => {
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
                        <DrawerItem style={tw`w-full p-0 m-0`} icon={({ focused, color }) => {
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
                        <DrawerItem style={tw`w-full p-0 m-0`} icon={({ focused, color }) => {
                            return (
                                <View style={tw`w-full my-2 flex-row justify-start items-center bg-transparent`}>
                                    <FontAwesome
                                        name='gear'
                                        size={30}
                                        color={Colors[colorScheme ?? 'light'].text}
                                        style={tw`ml-5`}
                                    />
                                    <Text style={tw`ml-5`}>Config</Text>
                                </View>
                            )
                        }} label={'Config'} onPress={() => { navigation.navigate('Config') }} />
                        <DrawerItem style={tw`w-full p-0 m-0`} icon={({ focused, color }) => {
                            return (
                                <View style={tw`w-full my-2 flex-row justify-start items-center bg-transparent`}>
                                    <AntDesign
                                        name='customerservice'
                                        size={30}
                                        color={Colors[colorScheme ?? 'light'].text}
                                        style={tw`ml-5`}
                                    />
                                    <Text style={tw`ml-5`}>Service</Text>
                                </View>
                            )
                        }} label={'Service'} onPress={() => { navigation.navigate('Service') }} />
                        <DrawerItem style={tw`w-full p-0 m-0`} icon={({ focused, color }) => {
                            return (
                                <View style={tw`w-full my-2 flex-row justify-start items-center bg-transparent`}>
                                    <FontAwesome5
                                        name='money-check'
                                        size={24}
                                        color={Colors[colorScheme ?? 'light'].text}
                                        style={tw`ml-5`}
                                    />
                                    <Text style={tw`ml-5`}>Payment</Text>
                                </View>
                            )
                        }} label={'Service'} onPress={() => { navigation.navigate('Service') }} />
                        <DrawerItem style={tw`w-full p-0 m-0 absolute bottom-5`} labelStyle={tw`w-full p-0 m-0 h-full`} icon={() => (
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
            <Drawer.Screen options={{
                drawerLabel: ({ focused, color }) => {
                    return (
                        <View style={tw`w-full my-2 flex-row justify-start items-center bg-transparent`}>
                            <FontAwesome
                                name='gear'
                                size={30}
                                color={Colors[colorScheme ?? 'light'].text}
                                style={tw`ml-5`}
                            />
                            <Text style={tw`ml-5`}>Config</Text>
                        </View>
                    )
                },
            }} name="Config" component={ConfigScreen} />
            <Drawer.Screen options={{
                drawerLabel: ({ focused, color }) => {
                    return (
                        <View style={tw`w-full my-2 flex-row justify-start items-center bg-transparent`}>
                            <FontAwesome
                                name='gear'
                                size={30}
                                color={Colors[colorScheme ?? 'light'].text}
                                style={tw`ml-5`}
                            />
                            <Text style={tw`ml-5`}>Service</Text>
                        </View>
                    )
                },
            }} name="Service" component={CustomServiceScreen} />
            <Drawer.Screen options={{
                drawerLabel: ({ focused, color }) => {
                    return (
                        <View style={tw`w-full my-2 flex-row justify-start items-center bg-transparent`}>
                            <FontAwesome
                                name='gear'
                                size={30}
                                color={Colors[colorScheme ?? 'light'].text}
                                style={tw`ml-5`}
                            />
                            <Text style={tw`ml-5`}>Service</Text>
                        </View>
                    )
                },
            }} name="Payment" component={PaymentScreen} />
        </Drawer.Navigator>
    );
}