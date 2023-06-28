import { useEffect, useState, useRef } from "react";
import { Animated, Platform, Text } from "react-native";
import { AnimatedRegion, Marker, MapMarker } from "react-native-maps";

import { MarkerData, initialMarkers } from "../../../constants/Markers";

export default function CarMarker({ car, onPress, onChange }: { car: MarkerData, onPress: () => void, onChange: (newCoordinate: MarkerData) => void }) {

    //const [marker, setMarker] = useState<MapMarker | Animated.LegacyRef<MapMarker> | null>(null);

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
        <Marker.Animated
            ref={marker}
            coordinate={{
                latitude: coordinate.latitude,
                longitude: coordinate.longitude,
            }}
            anchor={{ x: 0.5, y: 0.5 }}
            onPress={onPress}>
            <Animated.View >
                {/* <Text numberOfLines={1}>
                    {car.NumberPlate}
                </Text> */}
                <Animated.Image source={TaxiMarkerPNG} resizeMode="cover" />
            </Animated.View>
        </Marker.Animated>
    );
}