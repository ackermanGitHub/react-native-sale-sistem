import React, { useRef } from 'react';
import { ScrollView } from 'react-native';
import tw from './utils/tailwind';
import { useColorScheme } from 'react-native';
import { Text, View } from '../components/Themed';

const OrderScreen = ({ order = 'Order' }) => {

    const colorScheme = useColorScheme();

    const scrollViewRef = useRef<ScrollView>(null);
    if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd({ animated: true });
    }

    return (
        <View style={tw`justify-center items-center w-full h-[15%]`}>
            <View style={tw`flex-row justify-center items-center w-4/5 h-4/5 rounded-xl shadow-lg bg-white dark:bg-gray-800`}>
                <ScrollView ref={scrollViewRef} horizontal={true}>
                    <Text style={tw`p-4 text-2xl font-normal text-left dark:text-white`}>{order}</Text>
                </ScrollView>
            </View>
        </View>
    );
};
export default OrderScreen;