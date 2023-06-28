import React, { useEffect, useRef, useState } from 'react';
import {
    Image,
    Dimensions,
    useColorScheme,
    TextInput,
    Pressable,
    Platform
} from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import { DrawerNavigationProp } from '@react-navigation/drawer';

import { nightMap } from '../../constants/MapStyles';
import MapView, { Circle, Marker, MapMarker, Region, MarkerAnimated, AnimatedRegion } from 'react-native-maps';
// import MapViewDirections from 'react-native-maps-directions';
// @ts-ignore 
// import ClientMarkerPNG from '../../assets/images/clientMarker.png'
// @ts-ignore 
// import TaxiMarkerPNG from '../../assets/images/taxiMarker.png'
// import { MarkerData } from '../../constants/Markers';
import useMapConnection from '../../hooks/useMapConnetcion';

import tw from '../../components/utils/tailwind';
import { View, Text } from '../../components/theme/Themed';
import { AntDesign, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { AnimatedButton } from '../theme/AnimatedBtn';

import { useUser } from '@clerk/clerk-expo';
import useFadeIn from '../../hooks/useFadeIn';
import usePressIn from '../../hooks/usePressIn';
import { ModalContainer } from '../theme/ModalContainer';
import BottomSheetModalContainer from '../layout/BottomDrawer';

Image.prefetch("https://i.imgur.com/sNam9iJ.jpg")

const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;

type UserRole = 'taxi' | 'client'

const MapViewSnackComponent = ({ role = 'client', navigation }: { role?: UserRole, navigation?: DrawerNavigationProp<any> }) => {

    const [selectedMarkerIndex, setSelectedMarkerIndex] = useState<number | null>(null);
    const [menuVisible, setMenuVisible] = useState(true);
    const [region, setRegion] = useState<Region>({
        latitude: 23.118644,
        longitude: -82.3806211,
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0221,
    });
    const [showPin, setShowPin] = useState(false);
    const [pinned, setPinned] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const userMarkerRef = useRef<MapMarker>(null);
    const mapViewRef = useRef<MapView>(null);

    const { animatedValue: pinBtnAnim, handlePressIn: PressInPin, handlePressOut: PressOutPin } = usePressIn()
    const { animatedValue: PosBtnAnim, handlePressIn: PressInPos, handlePressOut: PressOutPos } = usePressIn()
    const { fadeAnim, fadeIn, fadeOut, isVisible } = useFadeIn({ defaultValue: true })
    const { markers, location, setLocation, historyLocation } = useMapConnection({
        onLocationLoad: (location) => {

        }
    });
    const { user, isLoaded, isSignedIn } = useUser()
    const colorScheme = useColorScheme();

    useEffect(() => {
        if (selectedMarkerIndex !== null && mapViewRef.current) {
            mapViewRef.current.animateToRegion({
                ...markers[selectedMarkerIndex].coordinate,
                latitudeDelta: 0.009,
                longitudeDelta: 0.009,
            });
        }
    }, [selectedMarkerIndex]);

    useEffect(() => {

    }, []);

    const animateToRegion = (region: Region) => {
        setRegion(region);
        mapViewRef.current.animateToRegion(region)
    }
    const handleMarkerPress = (index: number) => {
        setSelectedMarkerIndex(index);
    };
    const onRegionChangeComplete = (region: Region) => {
        setRegion(region);
        console.log(region)
    }

    return (
        <View style={tw.style("bg-transparent w-full h-full")}>
            <MapView.Animated
                onTouchMove={() => {
                    if (menuVisible) {
                        fadeOut()
                        setMenuVisible(false)
                    }
                }}
                onTouchEnd={() => {
                    if (!menuVisible) {
                        fadeIn()
                        setMenuVisible(true)
                    }
                }}
                style={tw.style("w-full h-full")}
                initialRegion={region}
                showsCompass={false}
                onRegionChangeComplete={onRegionChangeComplete}
                ref={mapViewRef}
                customMapStyle={colorScheme === 'dark' ? nightMap : undefined}
            >
                {location &&
                    <>
                        <MarkerAnimated
                            ref={userMarkerRef}
                            coordinate={location.coords}
                            /* coordinate={currentPosition} */
                            anchor={{ x: 0.5, y: 0.5 }}
                        >
                            <Animated.View style={tw`items-center justify-center w-12 h-12`} >
                                {
                                    isSignedIn ?
                                        <>
                                            <Animated.Image style={tw`w-8 h-8 rounded-full`} source={{
                                                uri: user.imageUrl
                                            }} resizeMode="cover" />
                                        </>
                                        :
                                        <>
                                            <FontAwesome
                                                name={colorScheme === 'light' ? 'user-circle' : 'user-circle-o'}
                                                size={30}
                                                color={Colors[colorScheme ?? 'light'].text}
                                            />
                                        </>
                                }
                            </Animated.View>
                        </MarkerAnimated  >
                        {
                            location && region && region.latitudeDelta < 0.032222222 && (
                                <Circle
                                    center={{
                                        latitude: location.coords.latitude,
                                        longitude: location.coords.longitude,
                                    }}
                                    radius={location.coords.accuracy}
                                    strokeColor="#111111"
                                    fillColor="rgba(26, 18, 11, 0.3)"
                                />
                            )
                        }
                    </>
                }
            </MapView.Animated>
            <>
                <Animated.View
                    style={[
                        tw`bg-transparent absolute z-20 bottom-24 right-12 flex-row justify-center items-center text-center self-center rounded-full`,
                        {
                            opacity: fadeAnim,
                            transform: [
                                {
                                    scale: PosBtnAnim
                                }
                            ]
                        },
                    ]}
                >
                    <Pressable
                        onPressIn={() => {
                            PressInPos();
                        }}
                        onPressOut={() => {
                            PressOutPos();
                        }}
                        onPress={() => {
                            setIsModalVisible(true);
                            if (location) {
                                animateToRegion({
                                    latitude: location.coords.latitude,
                                    longitude: location.coords.longitude,
                                    longitudeDelta: 0.0033333,
                                    latitudeDelta: 0.0033333,
                                });
                            }
                        }}
                    >
                        <MaterialIcons
                            name={location ? 'my-location' : 'location-searching'}
                            size={50}
                            color={Colors[colorScheme ?? 'light'].text}
                        />
                    </Pressable>
                </Animated.View>

                {selectedMarkerIndex &&
                    <Animated.View
                        key={selectedMarkerIndex}
                        style={[
                            tw`bg-[#eef0f2] dark:bg-black absolute bottom-0 left-0 right-0 p-4 items-center flex-row`,
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
                                            <View style={tw`h-full w-[2px] bg-black dark:bg-white`} />
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
            <BottomSheetModalContainer isOpen={isModalVisible} setIsOpen={setIsModalVisible} />
        </View>
    );
};

export default MapViewSnackComponent