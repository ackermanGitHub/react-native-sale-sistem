import React, { Component, useEffect, useRef, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Animated,
    Image,
    Dimensions,
    TouchableOpacity,
} from "react-native";
// import MapStyle from "./mapstyle.json";

import MapView, { Marker } from 'react-native-maps';
import tw from '../../../components/utils/tailwind';


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
            latitude: 45.524548,
            longitude: -122.6749817,
        },
        title: "Best Place",
        description: "This is the best place in Portland",
        image: WonderWoman,
    },
    {
        coordinate: {
            latitude: 45.524698,
            longitude: -122.6655507,
        },
        title: "Second Best Place",
        description: "This is the second best place in Portland",
        image: WonderWoman,
    },
    {
        coordinate: {
            latitude: 45.5230786,
            longitude: -122.6701034,
        },
        title: "Third Best Place",
        description: "This is the third best place in Portland",
        image: WonderWoman,
    },
    {
        coordinate: {
            latitude: 45.521016,
            longitude: -122.6561917,
        },
        title: "Fourth Best Place",
        description: "This is the fourth best place in Portland",
        image: WonderWoman,
    },
];

const MapScreen = () => {
    const mapRef = useRef<MapView>(null);
    const [markers, setMarkers] = useState<MarkerData[]>(initialMarkers);
    const [selectedMarkerIndex, setSelectedMarkerIndex] = useState<number | null>(null);
    const [region, setRegion] = useState({
        latitude: 45.52220671242907,
        longitude: -122.6653281029795,
        latitudeDelta: 0.04864195044303443,
        longitudeDelta: 0.040142817690068,
    });

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
                style={styles.card}
                onPress={() => handleMarkerPress(index)}
            >
                <View style={styles.cardImage}>
                    <Image source={marker.image} style={styles.cardItemImage} />
                </View>
                <View style={styles.cardDetails}>
                    <Text style={styles.cardTitle}>{marker.title}</Text>
                    <Text style={styles.cardDescription}>{marker.description}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={region}
                ref={mapRef}
            >
                {markers.map(renderMarker)}
            </MapView>
            <View style={styles.cardContainer}>
                {selectedMarkerIndex !== null ? (
                    renderCard(markers[selectedMarkerIndex], selectedMarkerIndex)
                ) : (
                    markers.map(renderCard)
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...tw.style("flex-1"),
    },
    map: {
        ...tw.style("flex-1"),
    },
    markerWrap: {
        alignItems: "center",
        justifyContent: "center",
    },
    marker: {
        width: 50,
        height: 50,
    },
    cardContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
    },
    card: {
        backgroundColor: "#FFF",
        borderRadius: 10,
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
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

export default MapScreen;