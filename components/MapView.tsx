import { View } from './Themed';
import tw from 'twrnc';
import { useEffect, useState } from 'react';
import GoogleMap, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

type MarkerType = {
    cordinates: {
        latitude: number,
        longitude: number,
    }
    title: string,
    description: string,
}

/* 
{
    latitude: 51.509865,
    longitude: -0.118092,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221,
}
{"accuracy": 20, "altitude": 3.9000000953674316, "altitudeAccuracy": 2.198444128036499, "heading": 0, "latitude": 23.1146548, "longitude": -82.4000881, "speed": 0}, "mocked": false, "timestamp": 1687359436857}
*/

const MapView = () => {
    const [markers, setMarkers] = useState<MarkerType[]>([])
    const [ws, setWs] = useState<WebSocket | null>(null);
    const [location, setLocation] = useState<Location.LocationObject | null>(null);

    const handleWebSocketMessage = (event: MessageEvent) => {
        console.log(event.data)
    };
    useEffect(() => {
        const ws = new WebSocket("ws://192.168.7.191:3333", 'map-client');
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

        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.error('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            console.log(location);
            setLocation(location);
        })();

        return () => {
            ws.removeEventListener("message", handleWebSocketMessage);
            ws.close();
        };
    }, []);

    return (
        <View style={tw`h-full w-full`}>
            <GoogleMap
                tintColor='red'
                style={tw`h-full w-full`}
                onLongPress={(e) => {
                    console.log(e.nativeEvent.coordinate)
                }}
                initialRegion={{
                    latitude: 23.1146548,
                    longitude: -82.4000881,
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
                    location &&
                    <Marker
                        coordinate={location?.coords}
                        title={'Current Position'}
                    />
                }
            </GoogleMap>
        </View>
    );
}

export default MapView;
