import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import tw from 'twrnc';

const OrderScreen = ({ order = 'Order' }) => {
    return (
        <View style={tw`justify-center items-center w-full h-[15%]`}>
            <View style={tw`flex-row justify-center items-center w-4/5 h-4/5 bg-[#fff] rounded-xl shadow-lg`}>
                <ScrollView horizontal={true}>
                    <Text style={tw`p-4 text-2xl font-normal text-left`}>{order}</Text>
                </ScrollView>
            </View>
        </View>
    );
};
export default OrderScreen;