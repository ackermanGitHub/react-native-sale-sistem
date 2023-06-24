/* 
import * as Location from 'expo-location';
, Animated
const fadeAnim = useRef(new Animated.Value(1)).current;

    const fadeIn = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const fadeOut = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
        textInputRef && textInputRef.blur();
    };
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
        }) ();
return () => {
    if (ws.readyState === WebSocket.OPEN) {
        ws.close();
    }
    ws.removeEventListener("message", handleWebSocketMessage);
    PositionSubscrition.remove()
    HeadingSuscription.remove()
};
{
    location &&
        <Marker
            rotation={role === 'taxi' ? location?.coords.heading || undefined : undefined}
            image={role === 'client' ? ClientMarker : TaxiMarker}
            coordinate={location?.coords}
            title={'Current Position'}
        />
}
<Animated.View
                style={[
                    tw`w-[85%] bg-slate-100 dark:bg-slate-800 absolute z-20 top-12 h-14 flex-row justify-evenly items-center self-center rounded-lg shadow-lg dark:shadow-slate-600`,
                    {
                        opacity: fadeAnim,
                    },
                ]}
            >
                <TextInput ref={setTextInputRef} placeholder='A Donde Vamos?' placeholderTextColor={colorScheme === 'dark' ? 'white' : 'black'} style={tw`w-full h-full p-4 text-black dark:text-white`} />
            </Animated.View>
            <Animated.View
                style={[
                    tw`w-16 h-16 bg-slate-100 dark:bg-slate-800 absolute z-20 bottom-24 right-24 flex-row justify-evenly items-center self-center rounded-full shadow-lg dark:shadow-slate-600`,
                    {
                        opacity: fadeAnim,
                    },
                ]}
            >
                <Text style={tw`w-full h-full p-4 justify-center items-center text-center text-lg`} >➕</Text>
            </Animated.View>

*/