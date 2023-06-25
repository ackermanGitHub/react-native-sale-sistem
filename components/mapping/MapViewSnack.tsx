import React, { useEffect, useRef, useState } from 'react';
import {
    Image,
    Dimensions,
    useColorScheme,
    TextInput,
    Pressable,
} from "react-native";
import { nightMap } from '../../constants/MapStyles';

import MapView, { Marker } from 'react-native-maps';
import tw from '../../components/utils/tailwind';

import Animated, { EasingNode } from 'react-native-reanimated';

// @ts-ignore 
import ClientMarkerPNG from '../../assets/images/clientMarker.png'
// @ts-ignore 
import TaxiMarkerPNG from '../../assets/images/taxiMarker.png'

import { MarkerData } from '../../constants/Markers';


import { View, Text } from '../../components/theme/Themed';
import useMapConnection from '../../hooks/useMapConnetcion';
import { AntDesign } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

import { useRouter } from 'expo-router';

const region = {
    latitude: 23.118644,
    longitude: -82.3806211,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221,
}


Image.prefetch("https://i.imgur.com/sNam9iJ.jpg")

const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;

type UserRole = 'taxi' | 'client'

const MapViewSnack = ({ role = 'taxi' }: { role: UserRole }) => {

    const { markers, setMarkers, ws, setWs, location, setLocation } = useMapConnection();
    const [selectedMarkerIndex, setSelectedMarkerIndex] = useState<number | null>(null);
    const [pinned, setPinned] = useState(false);

    const inputRef = useRef<TextInput>(null);
    const mapRef = useRef<MapView>(null);

    const colorScheme = useColorScheme();

    const fadeAnim = useRef(new Animated.Value(1)).current;

    const router = useRouter()

    const fadeIn = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            easing: EasingNode.linear,
        }).start();
    };

    const fadeOut = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            easing: EasingNode.linear,
        }).start();
    };

    const menuBtnAnim = React.useRef(new Animated.Value(1)).current;

    const PressInMenu = () => {
        Animated.timing(menuBtnAnim, {
            toValue: 0.85,
            duration: 75,
            easing: EasingNode.linear,
        }).start();
    };

    const PressOutMenu = () => {
        Animated.timing(menuBtnAnim, {
            toValue: 1,
            duration: 50,
            easing: EasingNode.linear,
        }).start();
    };

    const pinBtnAnim = React.useRef(new Animated.Value(1)).current;

    const PressInPin = () => {
        Animated.timing(pinBtnAnim, {
            toValue: 0.85,
            duration: 75,
            easing: EasingNode.linear,
        }).start();
    };

    const PressOutPin = () => {
        Animated.timing(pinBtnAnim, {
            toValue: 1,
            duration: 50,
            easing: EasingNode.linear,
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

    const handleMarkerPress = (index: number) => {
        setSelectedMarkerIndex(index);
    };

    return (
        <View style={tw.style("bg-transparent w-full h-full")}>

            <MapView
                onPress={() => {
                    inputRef && inputRef.current.blur()
                }}
                onTouchStart={() => {
                    fadeOut()
                }}
                onTouchEnd={() => {
                    fadeIn()
                }}
                style={tw.style("w-full h-full")}
                initialRegion={region}
                ref={mapRef}
                customMapStyle={colorScheme === 'dark' ? nightMap : undefined}
            >
                {markers.map((marker: MarkerData, index: number) => {
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
                })}
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


            <View
                style={[
                    tw`w-[95%] absolute z-20 p-2 top-12 h-16 flex-row justify-between items-center self-center bg-transparent`,
                ]}
            >
                <Animated.View
                    style={[
                        {
                            opacity: fadeAnim,
                        },
                    ]}
                >
                    <Pressable onPressIn={PressInMenu} onPressOut={PressOutMenu} onPress={() => {
                        router.push('/stack')
                    }}>
                        {({ pressed }) =>

                            <Animated.View
                                style={[
                                    tw`w-11/12 h-full mx-2 bg-slate-100 dark:bg-slate-800 justify-center items-center rounded-xl shadow-sm`,
                                    {
                                        transform: [{ scale: menuBtnAnim }],
                                        opacity: fadeAnim,
                                    },
                                ]}
                            >
                                <AntDesign
                                    name={'menu-unfold'}
                                    size={30}
                                    color={Colors[colorScheme ?? 'light'].text}
                                />
                            </Animated.View>
                        }
                    </Pressable>
                </Animated.View>
                <Animated.View
                    style={[
                        tw`w-10/12 h-full mx-5 bg-slate-100 dark:bg-slate-800 rounded-xl shadow-sm`,
                        {
                            opacity: fadeAnim,
                        },
                    ]}
                >
                    <TextInput ref={inputRef} placeholder='A Donde Vamos?' placeholderTextColor={colorScheme === 'dark' ? 'white' : 'black'} style={tw`w-full h-full p-4 bg-transparent`} />
                </Animated.View>
            </View>
            <>
                {selectedMarkerIndex &&
                    <Animated.View
                        key={selectedMarkerIndex}
                        style={[
                            tw`shadow-md rounded-xl bg-[#eef0f2] dark:bg-zinc-900 absolute bottom-0 left-0 right-0 dark:shadow-slate-800 p-4 mb-8 mx-5 items-center flex-row`,
                            {
                                opacity: pinned ? 1 : fadeAnim,
                            },
                        ]}
                    >
                        <View style={[{
                            width: CARD_WIDTH,
                            height: CARD_HEIGHT,
                            marginRight: 10,
                        }, { backgroundColor: 'transparent' }]}>
                            <Image source={markers[0].image} style={{
                                width: "100%",
                                height: "100%",
                                borderRadius: 10,
                            }} />
                        </View>
                        <View style={[tw`flex-1 bg-transparent`]}>
                            <Text style={tw`text-lg font-bold mb-2`}>{markers[0].title}</Text>
                            <Text style={tw`text-right`}>{markers[0].description}</Text>
                        </View>
                        <View style={tw`absolute top-5 right-5 w-20 h-8 flex-row gap-2 items-center justify-between bg-transparent`}>

                            <Pressable style={[
                                tw`justify-center items-center`,
                            ]} onPressIn={PressInPin} onPressOut={PressOutPin} onPress={() => {
                                if (pinned) {
                                    setPinned(false)
                                } else {
                                    setPinned(true)
                                }
                            }}>
                                {({ pressed }) =>
                                    <Animated.View
                                        style={[
                                            tw`w-8 h-8 relative`,
                                            {
                                                transform: [{ scale: pinBtnAnim }],
                                            },
                                        ]}
                                    >
                                        <Animated.View
                                            style={[
                                                tw`absolute w-full h-full px-3 justify-center items-center`,
                                                {
                                                    opacity: pinned ? 0 : 1,
                                                    transform: [{ rotate: '45deg' }],
                                                },
                                            ]}
                                        >
                                            <View style={tw`h-full w-[2px] bg-black`} />
                                        </Animated.View>
                                        <AntDesign
                                            name={colorScheme === 'dark' ? 'pushpin' : 'pushpino'}
                                            size={30}
                                            color={Colors[colorScheme ?? 'light'].text}
                                        />
                                    </Animated.View>
                                }
                            </Pressable>
                            <Pressable onPress={() => {
                                setSelectedMarkerIndex(null)
                            }}>
                                <AntDesign
                                    name={'close'}
                                    size={30}
                                    color={Colors[colorScheme ?? 'light'].text}
                                />
                            </Pressable>
                        </View>
                    </Animated.View>
                }
            </>
        </View>
    );
};

export default MapViewSnack;
