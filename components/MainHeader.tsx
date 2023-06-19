import { Modal, Pressable, TouchableWithoutFeedback } from 'react-native';
import { View, Text } from './Themed';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useState } from 'react'
import tw from 'twrnc';
import { ActivityIndicator, useColorScheme, View as NativeView } from 'react-native';

const MainHeader: React.FC<{ isVisible: boolean, children: React.ReactNode, onClose: () => void }> = ({ isVisible, children, onClose }) => {
    const colorScheme = useColorScheme();

    return (
        <Modal animationType="slide" transparent={true} visible={isVisible}>
            <Pressable onPress={onClose} style={tw`h-full w-full flex relative bg-transparent`}>
                <TouchableWithoutFeedback onPress={() => { }}>
                    <View style={tw`h-1/4 w-full shadow-2xl rounded-t-xl absolute bottom-0`}>
                        <View style={tw`h-[16%] rounded-t-md px-5 flex-row justify-between items-center`}>
                            <Text style={tw`text-sm`}>Choose a sticker</Text>
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
export default MainHeader;