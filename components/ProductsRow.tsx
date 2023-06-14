import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import tw from 'twrnc';

const ProductsRow = ({ handlePress }: { handlePress: (arg0: string) => void }) => {
    return (
        <View style={tw`justify-center h-1/4 w-full`}>
            <View style={tw`justify-center flex-row h-1/2 w-full`}>
                <TouchableOpacity style={tw`m-1 bg-[#617A55] rounded-md border-[1px] border-neutral-800 w-[30%] justify-center items-center`} onPress={() => handlePress("Refresco")}>
                    <Text style={tw`text-lg font-bold text-white`}>Refresco</Text>
                </TouchableOpacity>
                <TouchableOpacity style={tw`m-1 bg-[#617A55] rounded-md border-[1px] border-neutral-800 w-[30%] justify-center items-center`} onPress={() => handlePress("Café")}>
                    <Text style={tw`text-lg font-bold text-white`}>Café</Text>
                </TouchableOpacity>
                <TouchableOpacity style={tw`m-1 bg-[#617A55] rounded-md border-[1px] border-neutral-800 w-[30%] justify-center items-center`} onPress={() => handlePress("Helado")}>
                    <Text style={tw`text-lg font-bold text-white`}>Helado</Text>
                </TouchableOpacity>
            </View>
            <View style={tw`justify-center flex-row h-1/2 w-full`}>
                <TouchableOpacity style={tw`m-1 bg-[#617A55] rounded-md border-[1px] border-neutral-800 w-[30%] justify-center items-center`} onPress={() => handlePress("PJ")}>
                    <Text style={tw`text-lg font-bold text-white`}>PJ</Text>
                </TouchableOpacity>
                <TouchableOpacity style={tw`m-1 bg-[#617A55] rounded-md border-[1px] border-neutral-800 w-[30%] justify-center items-center`} onPress={() => handlePress("PJQ")}>
                    <Text style={tw`text-lg font-bold text-white`}>PJQ</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
export default ProductsRow;