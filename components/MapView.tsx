import { Text, View } from './Themed';
import tw from './utils/tailwind';
import { useEffect, useRef, useState } from 'react';
import GoogleMap, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import { nightMap } from '../constants/MapStyles';
import { Pressable, TextInput, TouchableOpacity, useColorScheme, Animated, StatusBar, StyleSheet } from 'react-native';
import { set } from 'zod';
// @ts-ignore 
import ClientMarker from '../assets/images/clientMarker.png'
// @ts-ignore 
import TaxiMarker from '../assets/images/taxiMarker.png'

type MarkerType = {
    cordinates: {
        latitude: number,
        longitude: number,
    }
    title: string,
    description: string,
}

const MapView = ({ role = 'taxi' }) => {
    const [markers, setMarkers] = useState<MarkerType[]>([])
    const [ws, setWs] = useState<WebSocket | null>(null);
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const colorScheme = useColorScheme()
    const [mapPressed, setMapPressed] = useState(false);
    const [textInputRef, setTextInputRef] = useState<TextInput | null>(null);

    const fadeAnim = useRef(new Animated.Value(1)).current;

    const fadeIn = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const fadeOut = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
        textInputRef && textInputRef.blur();
    };

    const handleWebSocketMessage = (event: MessageEvent) => {
        console.log(JSON.parse(event.data))
    };
    useEffect(() => {
        const ws = new WebSocket("ws://192.168.1.103:3333", 'map-client');
        setWs(ws);

        ws.addEventListener("open", (event) => {
            console.log('%c (map-client) Connection opened', 'background: orange; color: black;', event);
        });

        ws.addEventListener('message', handleWebSocketMessage);

        ws.addEventListener('close', (event) => {
            console.log('%c (map-client) Connection closed', 'background: orange; color: black;', event);
        });

        ws.addEventListener('error', (error) => {
            console.log('%c (map-client) WebSocket error', 'background: red; color: black;', error);
        });

        let foregroundSubscrition: Location.LocationSubscription;

        /* (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            await Location.enableNetworkProviderAsync()

            if (status !== 'granted') {
                console.error('Permission to access location was denied');
                return;
            }

            foregroundSubscrition = await Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.High,
                    distanceInterval: 10,
                    timeInterval: 5000,
                },
                location => {
                    setLocation(location);

                    if (ws.readyState === WebSocket.OPEN) {
                        ws.send(JSON.stringify(location));
                    }
                },

            )

            let location = await Location.getCurrentPositionAsync({});

            setLocation(location);
        })(); */

        return () => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.close();
            }
            ws.removeEventListener("message", handleWebSocketMessage);
            foregroundSubscrition.remove()
        };
    }, []);

    return (
        <View style={tw`h-full w-full`}>
            <Pressable style={tw`w-full h-full flex-row justify-evenly items-center self-center`} onPressIn={fadeOut} onPressOut={fadeIn}>
                <GoogleMap
                    showsCompass={false}
                    style={StyleSheet.absoluteFill}

                    showsUserLocation
                    showsMyLocationButton

                    followsUserLocation
                    userLocationPriority='high'

                    customMapStyle={colorScheme === 'dark' ? nightMap : undefined}
                    initialRegion={{
                        latitude: 23.118644,
                        longitude: -82.3806211,
                        latitudeDelta: 0.0322,
                        longitudeDelta: 0.0221,
                    }}
                >
                    {
                        markers.map((marker) => {
                            return (
                                <Marker
                                    coordinate={marker.cordinates}
                                    title={marker.title}
                                    description={marker.description}
                                />
                            )
                        })
                    }
                    {
                        /*  location &&
                         <Marker
                             rotation={role === 'taxi' ? location?.coords.heading || undefined : undefined}
                             image={role === 'client' ? ClientMarker : TaxiMarker}
                             coordinate={location?.coords}
                             title={'Current Position'}
                         /> */

                    }
                </GoogleMap>
            </Pressable>

            <Animated.View
                style={[
                    tw`w-[85%] bg-slate-100 dark:bg-slate-800 absolute z-20 top-12 h-14 flex-row justify-evenly items-center self-center rounded-lg shadow-lg dark:shadow-slate-600`,
                    {
                        opacity: fadeAnim,
                    },
                ]}
            >
                <TextInput ref={setTextInputRef} placeholder='A Donde Vamos?' placeholderTextColor={colorScheme === 'dark' ? 'white' : 'black'} style={tw`w-full h-full p-4 text-black dark:text-white`} />
            </Animated.View>
            <Animated.View
                style={[
                    tw`w-16 h-16 bg-slate-100 dark:bg-slate-800 absolute z-20 bottom-24 right-24 flex-row justify-evenly items-center self-center rounded-full shadow-lg dark:shadow-slate-600`,
                    {
                        opacity: fadeAnim,
                    },
                ]}
            >
                <Text style={tw`w-full h-full p-4 justify-center items-center`} >+</Text>
            </Animated.View>

            <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
        </View>
    );
}

export default MapView;
