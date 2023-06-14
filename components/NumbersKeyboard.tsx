import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import tw from 'twrnc';

const NumberKeyboard = ({ handlePress, handleCancel, handleConfirm }: { handlePress: (arg0: number) => void, handleCancel: () => void, handleConfirm: () => void }) => {
    return (
        <View style={tw`justify-center items-center w-full h-[60%]`}>
            <View style={tw`justify-center flex-row h-1/4 w-full`}>
                <TouchableOpacity style={tw`m-1 w-[30%] bg-[#D5CEA3] border-[1px] border-neutral-500 rounded-md justify-center items-center`} onPress={() => handlePress(1)}>
                    <Text style={tw`text-xl font-bold`}>1</Text>
                </TouchableOpacity>
                <TouchableOpacity style={tw`m-1 w-[30%] bg-[#D5CEA3] border-[1px] border-neutral-500 rounded-md justify-center items-center`} onPress={() => handlePress(2)}>
                    <Text style={tw`text-xl font-bold`}>2</Text>
                </TouchableOpacity>
                <TouchableOpacity style={tw`m-1 w-[30%] bg-[#D5CEA3] border-[1px] border-neutral-500 rounded-md justify-center items-center`} onPress={() => handlePress(3)}>
                    <Text style={tw`text-xl font-bold`}>3</Text>
                </TouchableOpacity>
            </View>
            <View style={tw`justify-center flex-row h-1/4 w-full`}>
                <TouchableOpacity style={tw`m-1 w-[30%] bg-[#D5CEA3] border-[1px] border-neutral-500 rounded-md justify-center items-center`} onPress={() => handlePress(4)}>
                    <Text style={tw`text-xl font-bold`}>4</Text>
                </TouchableOpacity>
                <TouchableOpacity style={tw`m-1 w-[30%] bg-[#D5CEA3] border-[1px] border-neutral-500 rounded-md justify-center items-center`} onPress={() => handlePress(5)}>
                    <Text style={tw`text-xl font-bold`}>5</Text>
                </TouchableOpacity>
                <TouchableOpacity style={tw`m-1 w-[30%] bg-[#D5CEA3] border-[1px] border-neutral-500 rounded-md justify-center items-center`} onPress={() => handlePress(6)}>
                    <Text style={tw`text-xl font-bold`}>6</Text>
                </TouchableOpacity>
            </View>
            <View style={tw`justify-center flex-row h-1/4 w-full`}>
                <TouchableOpacity style={tw`m-1 w-[30%] bg-[#D5CEA3] border-[1px] border-neutral-500 rounded-md justify-center items-center`} onPress={() => handlePress(7)}>
                    <Text style={tw`text-xl font-bold`}>7</Text>
                </TouchableOpacity>
                <TouchableOpacity style={tw`m-1 w-[30%] bg-[#D5CEA3] border-[1px] border-neutral-500 rounded-md justify-center items-center`} onPress={() => handlePress(8)}>
                    <Text style={tw`text-xl font-bold`}>8</Text>
                </TouchableOpacity>
                <TouchableOpacity style={tw`m-1 w-[30%] bg-[#D5CEA3] border-[1px] border-neutral-500 rounded-md justify-center items-center`} onPress={() => handlePress(9)}>
                    <Text style={tw`text-xl font-bold`}>9</Text>
                </TouchableOpacity>
            </View>
            <View style={tw`justify-center flex-row h-1/4 w-full`}>
                <TouchableOpacity style={[tw`m-1 w-[30%] bg-[#D5CEA3] border-[1px] border-neutral-500 rounded-md justify-center items-center`]} onPress={handleCancel}>
                    <Text style={tw`text-xl font-bold`}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[tw`m-1 w-[30%] bg-[#D5CEA3] border-[1px] border-neutral-500 rounded-md justify-center items-center`]} onPress={() => handlePress(0)}>
                    <Text style={tw`text-xl font-bold`}>0</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[tw`m-1 w-[30%] bg-[#D5CEA3] border-[1px] border-neutral-500 rounded-md justify-center items-center`]} onPress={handleConfirm}>
                    <Text style={tw`text-xl font-bold`}>Confirmar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default NumberKeyboard;