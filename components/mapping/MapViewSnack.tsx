import React, { useEffect, useRef, useState } from 'react';
import * as Location from 'expo-location';
import {
    StyleSheet,
    Animated,
    Image,
    Dimensions,
    useColorScheme,
    TextInput,
    Pressable,
} from "react-native";
import { nightMap } from '../../constants/MapStyles';

import MapView, { Marker } from 'react-native-maps';
import tw from '../../components/utils/tailwind';

// @ts-ignore 
import ClientMarkerPNG from '../../assets/images/clientMarker.png'
// @ts-ignore 
import TaxiMarkerPNG from '../../assets/images/taxiMarker.png'

import { initialMarkers, MarkerData } from '../../constants/Markers';


import { View, Text } from '../../components/theme/Themed';


Image.prefetch("https://i.imgur.com/sNam9iJ.jpg")

const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;

type UserRole = 'taxi' | 'client'

const MapViewSnack = ({ role = 'taxi' }: { role: UserRole }) => {
    const mapRef = useRef<MapView>(null);
    const [markers, setMarkers] = useState<MarkerData[]>(initialMarkers);
    const [selectedMarkerIndex, setSelectedMarkerIndex] = useState<number | null>(null);
    const [ws, setWs] = useState<WebSocket | null>(null);
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [region, setRegion] = useState({
        latitude: 23.118644,
        longitude: -82.3806211,
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0221,
    });

    const colorScheme = useColorScheme();

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
    };

    useEffect(() => {
        if (selectedMarkerIndex !== null && mapRef.current) {
            mapRef.current.animateToRegion({
                ...markers[selectedMarkerIndex].coordinate,
                latitudeDelta: 0.009,
                longitudeDelta: 0.009,
            });
        }
    }, [selectedMarkerIndex]);

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

        let PositionSubscrition: Location.LocationSubscription;

        let HeadingSuscription: Location.LocationSubscription;

        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            await Location.enableNetworkProviderAsync()

            if (status !== 'granted') {
                console.error('Permission to access location was denied');
                return;
            }

            PositionSubscrition = await Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.BestForNavigation,
                    distanceInterval: 10,
                    timeInterval: 5000,
                },
                location => {
                    setLocation((prevLocation) => {
                        if (!prevLocation) {
                            return null
                        }
                        return {
                            ...prevLocation,
                            coords: {
                                ...prevLocation?.coords,
                                latitude: location.coords.latitude,
                                longitude: location.coords.longitude,
                            },
                        }
                    });

                    if (ws.readyState === WebSocket.OPEN) {
                        ws.send(JSON.stringify(location));
                    }
                },

            )

            HeadingSuscription = await Location.watchHeadingAsync((heading) => {
               /* Here goes an estadistics algorithm */ https://www.notion.so/Greatest-Idea-of-all-Time-81d8a584da8945d4a52183c91ea218aa?pvs=4
                // https://notion-api.splitbee.io/v1/page/81d8a584da8945d4a52183c91ea218aa
                setLocation((prevLocation) => {
                    if (!prevLocation) {
                        return null
                    }
                    return {
                        ...prevLocation,
                        coords: {
                            ...prevLocation?.coords,
                            heading: heading.trueHeading,
                        },
                    }
                })
            })

            let location = await Location.getCurrentPositionAsync({});

            setLocation(location);
        })();

        return () => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.close();
            }
            ws.removeEventListener("message", handleWebSocketMessage);
            PositionSubscrition.remove()
            HeadingSuscription.remove()
        };
    }, []);

    const handleMarkerPress = (index: number) => {
        setSelectedMarkerIndex(index);
    };

    const renderMarker = (marker: MarkerData, index: number) => {
        return (
            <Marker
                key={index}
                coordinate={marker.coordinate}
                onPress={() => handleMarkerPress(index)}
            >
                <Animated.View style={tw`items-center justify-center`}>
                    <Animated.Image
                        source={marker.image}
                        style={[tw`w-12 h-12 p-4 bg-slate-100 rounded-md`]}
                        resizeMode="cover"
                    />
                </Animated.View>
            </Marker>
        );
    };

    const renderCard = (marker: MarkerData, index: number) => {
        return (
            <Animated.View
                key={index}
                style={[
                    tw`shadow-md rounded-xl bg-[#eef0f2] dark:bg-zinc-900 absolute bottom-0 left-0 right-0 dark:shadow-slate-800 p-4 mb-8 mx-5 items-center flex-row`,
                    {
                        opacity: fadeAnim,
                    },
                ]}
            >
                <View style={[{
                    width: CARD_WIDTH,
                    height: CARD_HEIGHT,
                    marginRight: 10,
                }, { backgroundColor: 'transparent' }]}>
                    <Image source={marker.image} style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: 10,
                    }} />
                </View>
                <View style={[tw`flex-1 bg-transparent`]}>
                    <Text style={tw`text-lg font-bold mb-2`}>{marker.title}</Text>
                    <Text style={tw`text-right`}>{marker.description}</Text>
                </View>
            </Animated.View>
        );
    };

    return (
        <View style={tw.style("bg-transparent w-full h-full")}>

            <Pressable style={tw`w-full h-full flex-row justify-evenly items-center self-center`} onPressIn={fadeOut} onPressOut={fadeIn}>
                <MapView
                    style={tw.style("w-full h-full")}
                    initialRegion={region}
                    ref={mapRef}
                    customMapStyle={colorScheme === 'dark' ? nightMap : undefined}
                >
                    {markers.map(renderMarker)}
                    {
                        location &&
                        <Marker
                            rotation={role === 'taxi' ? location?.coords.heading || undefined : undefined}
                            image={role === 'client' ? ClientMarkerPNG : TaxiMarkerPNG}
                            coordinate={location?.coords}
                            title={'Current Position'}
                        />
                    }
                </MapView>


            </Pressable>
            <Animated.View
                style={[
                    tw`w-[85%] bg-slate-100 dark:bg-slate-800 absolute z-20 top-12 h-14 flex-row justify-evenly items-center self-center rounded-lg shadow-lg dark:shadow-slate-600`,
                    {
                        opacity: fadeAnim,
                    },
                ]}
            >
                <TextInput placeholder='A Donde Vamos?' placeholderTextColor={colorScheme === 'dark' ? 'white' : 'black'} style={tw`w-full h-full p-4 text-black dark:text-white`} />
            </Animated.View>
            <>
                {selectedMarkerIndex !== null ? (
                    renderCard(markers[selectedMarkerIndex], selectedMarkerIndex)
                ) : (
                    renderCard(markers[0], 0)
                )}
            </>
        </View>
    );
};

export default MapViewSnack;