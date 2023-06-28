import { useEffect, useState, useRef } from "react";
import { Animated, Platform, Text } from "react-native";
import { AnimatedRegion, Marker, MapMarker, MarkerAnimated } from "react-native-maps";

import { MarkerData, initialMarkers } from "../../../constants/Markers";

export default function CarMarker({ car, onPress, onChange }: { car: MarkerData, onPress: () => void, onChange: (newCoordinate: MarkerData) => void }) {

    //const [marker, setMarker] = useState<MapMarker | Animated.LegacyRef<MapMarker> | null>(null);

    const userMarkerRef = useRef<MapMarker>(null);
    const currentPosition = useRef(new AnimatedRegion({
        latitude: 23.118644,
        longitude: -82.3806211,
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0221,
    })).current;

    const [coordinate, setCoordinate] = useState(
        new AnimatedRegion({
            latitude: car.coordinate.latitude,
            longitude: car.coordinate.longitude,
        }),
    );

    const marker = useRef<MapMarker>(null);

    useEffect(() => {
    }, []);

    const animateMarker = (newCoordinate: MarkerData) => {
        onChange(newCoordinate)
        /* const newCoordinate = {
            coordinate: {
                latitude: car.coordinate.latitude,
                longitude: car.coordinate.longitude,
            },
            title: car.title,
            description: car.description,
            image: car.image,
        } */

        if (Platform.OS === 'android') {
            if (marker) {
                marker.current.animateMarkerToCoordinate({
                    latitude: newCoordinate.coordinate.latitude,
                    longitude: newCoordinate.coordinate.longitude,
                }, 15000);
            }
        } else {
            coordinate.start();
        }
    };

    return (
        <>
            <MarkerAnimated
                ref={userMarkerRef}
                coordinate={{
                    latitude: latitude.value,
                    longitude: longitude.value
                }}
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
    );
}