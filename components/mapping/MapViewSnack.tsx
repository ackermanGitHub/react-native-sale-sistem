import React, { useEffect, useRef, useState } from 'react';
import {
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

import { MarkerData } from '../../constants/Markers';


import { View, Text } from '../../components/theme/Themed';
import useMapConnection from '../../hooks/useMapConnetcion';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import useFadeIn from '../../hooks/useFadeIn';
import usePressIn from '../../hooks/usePressIn';
import PressableWithEffect from '../Animations';



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

    const [selectedMarkerIndex, setSelectedMarkerIndex] = useState<number | null>(null);

    const inputRef = useRef<TextInput>(null);
    const mapRef = useRef<MapView>(null);

    const colorScheme = useColorScheme();

    const { markers, setMarkers, ws, setWs, location, setLocation } = useMapConnection();
    const { animatedValue, handlePressIn, handlePressOut } = usePressIn()
    const { fadeAnim, fadeIn, fadeOut } = useFadeIn()

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
                onTouchStart={fadeOut}
                onTouchEnd={fadeIn}
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
                    <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut}>
                        {({ pressed }) =>

                            <Animated.View
                                style={[
                                    tw`w-11/12 h-full mx-2 bg-slate-100 dark:bg-slate-800 justify-center items-center rounded-xl shadow-sm`,
                                    {
                                        transform: [{ scale: animatedValue }],
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
                {selectedMarkerIndex !== null ? (
                    <Animated.View
                        key={selectedMarkerIndex}
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
                            <Image source={markers[selectedMarkerIndex].image} style={{
                                width: "100%",
                                height: "100%",
                                borderRadius: 10,
                            }} />
                        </View>
                        <View style={[tw`flex-1 bg-transparent`]}>
                            <Text style={tw`text-lg font-bold mb-2`}>{markers[selectedMarkerIndex].title}</Text>
                            <Text style={tw`text-right`}>{markers[selectedMarkerIndex].description}</Text>
                        </View>
                    </Animated.View>
                ) : (
                    <Animated.View
                        key={selectedMarkerIndex}
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
                        <PressableWithEffect />
                        {/* <Pressable style={[
                            tw`justify-center items-center p-2 absolute top-5 right-5`,
                        ]} onPressIn={handlePressIn} onPressOut={handlePressOut}>
                            {({ pressed }) =>
                                <Animated.View
                                    style={[
                                        tw``,
                                        {
                                            transform: [{ scale: animatedValue }],
                                            opacity: fadeAnim,
                                        },
                                    ]}
                                >
                                    <AntDesign
                                        name={colorScheme === 'dark' ? 'pushpin' : 'pushpino'}
                                        size={30}
                                        color={Colors[colorScheme ?? 'light'].text}
                                    />
                                </Animated.View>
                            }
                        </Pressable> */}
                    </Animated.View>
                )}
            </>
        </View>
    );
};

export default MapViewSnack;