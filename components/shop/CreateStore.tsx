import { Modal, Pressable, TouchableWithoutFeedback } from 'react-native';
import { View, Text } from '../theme/Themed';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useState } from 'react'
import tw from 'twrnc';
import { ActivityIndicator, useColorScheme, View as NativeView } from 'react-native';

export const CreateStoreModal: React.FC<{ isVisible: boolean, children: React.ReactNode, onClose: () => void, title: string }> = ({ isVisible, children, onClose, title }) => {
    const colorScheme = useColorScheme();

    return (
        <Modal animationType="slide" transparent={true} visible={isVisible}>
            <Pressable onPress={onClose} style={tw`h-full w-full flex relative bg-transparent`}>
                <TouchableWithoutFeedback onPress={() => { }}>
                    <View style={tw`h-1/4 w-full shadow-2xl border-slate-300 dark:border-slate-700 border-t-2 border-solid dark:shadow-slate-300 rounded-t-xl overflow-hidden absolute bottom-0 `}>
                        <View style={tw`h-[16%] rounded-t-md px-5 flex-row justify-between items-center`}>
                            <Text style={tw`text-sm`}>{title}</Text>
                            <Pressable onPress={onClose}>
                                <MaterialIcons name="close" color={colorScheme === 'dark' ? 'white' : 'black'} style={tw`text-sm`} size={22} />
                            </Pressable>
                        </View>
                        {children}
                    </View>
                </TouchableWithoutFeedback>
            </Pressable>
        </Modal>
    );
}