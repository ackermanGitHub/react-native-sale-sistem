import React, { useEffect, useRef, useState } from 'react'
import { MarkerData, initialMarkers } from '../constants/Markers';
import * as Location from 'expo-location';

const useMapConnetcion = () => {
    const [markers, setMarkers] = useState<MarkerData[]>(initialMarkers);
    const [ws, setWs] = useState<WebSocket | null>(null);
    const [location, setLocation] = useState<Location.LocationObject | null>(null);

    const handleWebSocketMessage = (event: MessageEvent) => {
        console.log(JSON.parse(event.data))
    };

    useEffect(() => {
        const ws = new WebSocket("ws://192.168.39.191:3333", 'map-client');
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

    return {
        markers,
        setMarkers,
        ws,
        setWs,
        location,
        setLocation,
        handleWebSocketMessage
    }
}

export default useMapConnetcion