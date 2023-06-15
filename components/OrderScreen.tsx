import React, { useRef } from 'react';
import { View, Text, ScrollView } from 'react-native';
import tw from 'twrnc';

const OrderScreen = ({ order = 'Order' }) => {

    const scrollViewRef = useRef<ScrollView>(null);
    if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd({ animated: true });
    }

    return (
        <View style={tw`justify-center items-center w-full h-[15%]`}>
            <View style={tw`flex-row justify-center items-center w-4/5 h-4/5 bg-[#fff] rounded-xl shadow-lg`}>
                <ScrollView ref={scrollViewRef} horizontal={true}>
                    <Text style={tw`p-4 text-2xl font-normal text-left`}>{order}</Text>
                </ScrollView>
            </View>
        </View>
    );
};
export default OrderScreen;