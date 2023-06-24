import React, { useEffect, useRef, useState } from 'react';
import {
    StyleSheet,
    Animated,
    Image,
    Dimensions,
    TouchableOpacity,
    useColorScheme,
} from "react-native";
import { nightMap } from '../../../constants/MapStyles';

import MapView, { Marker } from 'react-native-maps';
import tw from '../../../components/utils/tailwind';


import { View, Text } from '../../../components/Themed';


const WonderWoman = { uri: "http://i.imgur.com/sNam9iJ.jpg" };

Image.prefetch("https://i.imgur.com/sNam9iJ.jpg")

const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;

interface MarkerData {
    coordinate: {
        latitude: number;
        longitude: number;
    };
    title: string;
    description: string;
    image: any;
}

const initialMarkers: MarkerData[] = [
    {
        coordinate: {
            latitude: 23.1218644,
            longitude: -82.32806211,
        },
        title: "Best Place",
        description: "This is the best place in Portland",
        image: WonderWoman,
    },
    {
        coordinate: {
            latitude: 23.1118644,
            longitude: -82.31806211,
        },
        title: "Second Best Place",
        description: "This is the second best place in Portland",
        image: WonderWoman,
    },
    {
        coordinate: {
            latitude: 23.1318644,
            longitude: -82.33806211,
        },
        title: "Third Best Place",
        description: "This is the third best place in Portland",
        image: WonderWoman,
    },
    {
        coordinate: {
            latitude: 23.1148644,
            longitude: -82.34806211,
        },
        title: "Fourth Best Place",
        description: "This is the fourth best place in Portland",
        image: WonderWoman,
    },
];

const FunctionalSnack = () => {
    const mapRef = useRef<MapView>(null);
    const [markers, setMarkers] = useState<MarkerData[]>(initialMarkers);
    const [selectedMarkerIndex, setSelectedMarkerIndex] = useState<number | null>(null);
    const [region, setRegion] = useState({
        latitude: 23.118644,
        longitude: -82.3806211,
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0221,
    });

    const colorScheme = useColorScheme();

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

    const renderMarker = (marker: MarkerData, index: number) => {
        return (
            <Marker
                key={index}
                coordinate={marker.coordinate}
                onPress={() => handleMarkerPress(index)}
            >
                <Animated.View style={[styles.markerWrap]}>
                    <Animated.Image
                        source={marker.image}
                        style={[styles.marker]}
                        resizeMode="cover"
                    />
                </Animated.View>
            </Marker>
        );
    };

    const renderCard = (marker: MarkerData, index: number) => {
        return (
            <TouchableOpacity
                key={index}
                style={tw`shadow-md rounded-xl bg-[#eef0f2] dark:bg-zinc-900 absolute bottom-0 left-0 right-0 dark:shadow-slate-800 p-4 mb-8 mx-5 items-center flex-row`}
                onPress={() => handleMarkerPress(index)}
            >
                <View style={[styles.cardImage, { backgroundColor: 'transparent' }]}>
                    <Image source={marker.image} style={styles.cardItemImage} />
                </View>
                <View style={[styles.cardDetails, { backgroundColor: 'transparent' }]}>
                    <Text style={styles.cardTitle}>{marker.title}</Text>
                    <Text style={styles.cardDescription}>{marker.description}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={tw.style("bg-transparent w-full h-full")}>
            <MapView
                style={tw.style("w-full h-full")}
                initialRegion={region}
                ref={mapRef}
                customMapStyle={colorScheme === 'dark' ? nightMap : undefined}
            >
                {markers.map(renderMarker)}
            </MapView>
            <>
                {selectedMarkerIndex !== null ? (
                    renderCard(markers[selectedMarkerIndex], selectedMarkerIndex)
                ) : (
                    markers.map(renderCard)
                )}
            </>
        </View>
    );
};

const styles = StyleSheet.create({
    markerWrap: {
        alignItems: "center",
        justifyContent: "center",
    },
    marker: {
        width: 50,
        height: 50,
        padding: 15,
        backgroundColor: "#FFF",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        borderRadius: 10,
    },
    cardImage: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        marginRight: 10,
    },
    cardItemImage: {
        width: "100%",
        height: "100%",
        borderRadius: 10,
    },
    cardDetails: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
    },
    cardDescription: {
        fontSize: 16,
    },
});

export default FunctionalSnack;