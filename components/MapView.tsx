import { View } from './Themed';
import tw from 'twrnc';
import { useEffect, useState } from 'react';
import GoogleMap, { Marker } from 'react-native-maps';

const MapView = () => {
    const [region, setRegion] = useState({
        latitude: 37.774929,
        longitude: -122.419418,
    })
    const [markers, setMarkers] = useState()
    const [ws, setWs] = useState<WebSocket | null>(null);

    const handleWebSocketMessage = (event: MessageEvent) => {
        console.log(event.data)
    };
    useEffect(() => {
        const ws = new WebSocket("ws://192.168.67.191:3333", 'map-client');
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

        return () => {
            ws.removeEventListener("message", handleWebSocketMessage);
            ws.close();
        };
    }, []);

    useEffect(() => {
        const marker = new Marker({
            title: 'Your driver',
            coordinate: region
        });
    })

    return (
        <View style={tw`h-full w-full`}>
            <GoogleMap
                tintColor='red'
                initialRegion={{
                    ...region,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                style={tw`h-full w-full`}
            >
                <Marker
                    coordinate={{
                        latitude: 37.774929,
                        longitude: -122.419418,
                    }}
                    title='SF Marker'
                    description='Default Marker'
                />
            </GoogleMap>
        </View>
    );
}

export default MapView;
