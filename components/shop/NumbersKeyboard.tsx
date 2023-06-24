import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import tw from '../utils/tailwind';
import { useColorScheme } from 'react-native';
import { Text, View } from '../theme/Themed';

const NumberKeyboard = ({ handlePress, handleCancel, handleConfirm }: { handlePress: (arg0: number) => void, handleCancel: () => void, handleConfirm: () => void }) => {

    const colorScheme = useColorScheme();

    return (
        <View style={tw`justify-center items-center w-full h-[60%]`}>
            <View style={tw`justify-center flex-row h-1/4 w-full`}>
                <TouchableOpacity style={tw`m-1 w-[30%] border-[1px] rounded-md justify-center items-center bg-gray-300 border-slate-500 dark:bg-gray-900 dark:border-slate-700`} onPress={() => handlePress(1)}>
                    <Text style={tw`text-xl font-bold dark:text-white`}>1</Text>
                </TouchableOpacity>
                <TouchableOpacity style={tw`m-1 w-[30%] border-[1px] rounded-md justify-center items-center bg-gray-300 border-slate-500 dark:bg-gray-900 dark:border-slate-700`} onPress={() => handlePress(2)}>
                    <Text style={tw`text-xl font-bold dark:text-white`}>2</Text>
                </TouchableOpacity>
                <TouchableOpacity style={tw`m-1 w-[30%] border-[1px] rounded-md justify-center items-center bg-gray-300 border-slate-500 dark:bg-gray-900 dark:border-slate-700`} onPress={() => handlePress(3)}>
                    <Text style={tw`text-xl font-bold dark:text-white`}>3</Text>
                </TouchableOpacity>
            </View>
            <View style={tw`justify-center flex-row h-1/4 w-full`}>
                <TouchableOpacity style={tw`m-1 w-[30%] border-[1px] rounded-md justify-center items-center bg-gray-300 border-slate-500 dark:bg-gray-900 dark:border-slate-700`} onPress={() => handlePress(4)}>
                    <Text style={tw`text-xl font-bold dark:text-white`}>4</Text>
                </TouchableOpacity>
                <TouchableOpacity style={tw`m-1 w-[30%] border-[1px] rounded-md justify-center items-center bg-gray-300 border-slate-500 dark:bg-gray-900 dark:border-slate-700`} onPress={() => handlePress(5)}>
                    <Text style={tw`text-xl font-bold dark:text-white`}>5</Text>
                </TouchableOpacity>
                <TouchableOpacity style={tw`m-1 w-[30%] border-[1px] rounded-md justify-center items-center bg-gray-300 border-slate-500 dark:bg-gray-900 dark:border-slate-700`} onPress={() => handlePress(6)}>
                    <Text style={tw`text-xl font-bold dark:text-white`}>6</Text>
                </TouchableOpacity>
            </View>
            <View style={tw`justify-center flex-row h-1/4 w-full`}>
                <TouchableOpacity style={tw`m-1 w-[30%] border-[1px] rounded-md justify-center items-center bg-gray-300 border-slate-500 dark:bg-gray-900 dark:border-slate-700`} onPress={() => handlePress(7)}>
                    <Text style={tw`text-xl font-bold dark:text-white`}>7</Text>
                </TouchableOpacity>
                <TouchableOpacity style={tw`m-1 w-[30%] border-[1px] rounded-md justify-center items-center bg-gray-300 border-slate-500 dark:bg-gray-900 dark:border-slate-700`} onPress={() => handlePress(8)}>
                    <Text style={tw`text-xl font-bold dark:text-white`}>8</Text>
                </TouchableOpacity>
                <TouchableOpacity style={tw`m-1 w-[30%] border-[1px] rounded-md justify-center items-center bg-gray-300 border-slate-500 dark:bg-gray-900 dark:border-slate-700`} onPress={() => handlePress(9)}>
                    <Text style={tw`text-xl font-bold dark:text-white`}>9</Text>
                </TouchableOpacity>
            </View>
            <View style={tw`justify-center flex-row h-1/4 w-full`}>
                <TouchableOpacity style={[tw`m-1 w-[30%] border-[1px] rounded-md justify-center items-center bg-gray-300 border-slate-500 dark:bg-gray-900 dark:border-slate-700`]} onPress={handleCancel}>
                    <Text style={tw`text-xl font-bold dark:text-white`}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[tw`m-1 w-[30%] border-[1px] rounded-md justify-center items-center bg-gray-300 border-slate-500 dark:bg-gray-900 dark:border-slate-700`]} onPress={() => handlePress(0)}>
                    <Text style={tw`text-xl font-bold dark:text-white`}>0</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[tw`m-1 w-[30%] border-[1px] rounded-md justify-center items-center bg-gray-300 border-slate-500 dark:bg-gray-900 dark:border-slate-700`]} onPress={handleConfirm}>
                    <Text style={tw`text-xl font-bold dark:text-white`}>Confirmar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default NumberKeyboard;