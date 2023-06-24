import React from 'react';
import { TouchableOpacity } from 'react-native';
import tw from '../utils/tailwind';
import { useColorScheme } from 'react-native';
import { Text, View } from '../theme/Themed';

const ProductsRow = ({ handlePress }: { handlePress: (arg0: string) => void }) => {

    const colorScheme = useColorScheme();

    return (
        <View style={tw`justify-center h-1/4 w-full`}>
            <View style={tw`justify-center flex-row h-1/2 w-full`}>
                <TouchableOpacity style={tw`m-1 rounded-md border-[1px] w-[30%] justify-center items-center bg-gray-200 border-slate-400 dark:bg-gray-700 dark:border-slate-500`} onPress={() => handlePress("Refresco")}>
                    <Text style={tw`text-lg font-bold dark:text-white`}>Refresco</Text>
                </TouchableOpacity>
                <TouchableOpacity style={tw`m-1 rounded-md border-[1px] w-[30%] justify-center items-center bg-gray-200 border-slate-400 dark:bg-gray-700 dark:border-slate-500`} onPress={() => handlePress("Café")}>
                    <Text style={tw`text-lg font-bold dark:text-white`}>Café</Text>
                </TouchableOpacity>
                <TouchableOpacity style={tw`m-1 rounded-md border-[1px] w-[30%] justify-center items-center bg-gray-200 border-slate-400 dark:bg-gray-700 dark:border-slate-500`} onPress={() => handlePress("Helado")}>
                    <Text style={tw`text-lg font-bold dark:text-white`}>Helado</Text>
                </TouchableOpacity>
            </View>
            <View style={tw`justify-center flex-row h-1/2 w-full`}>
                <TouchableOpacity style={tw`m-1 rounded-md border-[1px] w-[30%] justify-center items-center bg-gray-200 border-slate-400 dark:bg-gray-700 dark:border-slate-500`} onPress={() => handlePress("PJ")}>
                    <Text style={tw`text-lg font-bold dark:text-white`}>PJ</Text>
                </TouchableOpacity>
                <TouchableOpacity style={tw`m-1 rounded-md border-[1px] w-[30%] justify-center items-center bg-gray-200 border-slate-400 dark:bg-gray-700 dark:border-slate-500`} onPress={() => handlePress("PJQ")}>
                    <Text style={tw`text-lg font-bold dark:text-white`}>PJQ</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
export default ProductsRow;