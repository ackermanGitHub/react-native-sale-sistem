import { View } from './Themed';
import { View as RNView } from 'react-native';
import tw from 'twrnc';
import { useEffect, useState } from 'react';
import GoogleMap, { Marker } from 'react-native-maps';

const MapView = () => {

    const [region, setRegion] = useState({
        latitude: 37.774929,
        longitude: -122.419418,
    })
    const [markers, setMarkers] = useState()

    useEffect(() => {
        const marker = new Marker({
            title: 'Your driver',
            coordinate: region
        });
    })

    return (
        <RNView style={tw`h-full w-full`}>
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
        </RNView>
    );
}

export default MapView;
