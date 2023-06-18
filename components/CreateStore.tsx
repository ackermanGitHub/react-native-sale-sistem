import { Modal, Pressable } from 'react-native';
import { View, Text } from './Themed';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useState } from 'react'
import tw from 'twrnc';
import { ActivityIndicator, useColorScheme } from 'react-native';

const CreateStoreModal: React.FC<{ isVisible: boolean, children: React.ReactNode, onClose: () => void }> = ({ isVisible, children, onClose }) => {
    const colorScheme = useColorScheme();

    return (
        <Modal animationType="slide" transparent={true} visible={isVisible}>
            <View style={tw`h-full w-full flex relative`}>
                <View style={tw`h-1/4 w-full shadow-2xl rounded-t-xl absolute bottom-0`}>
                    <View style={tw`h-[16%] rounded-t-md px-5 flex-row justify-between items-center`}>
                        <Text style={tw`text-sm`}>Choose a sticker</Text>
                        <Pressable onPress={onClose}>
                            <MaterialIcons name="close" color={colorScheme === 'dark' ? 'white' : 'black'} style={tw`text-sm`} size={22} />
                        </Pressable>
                    </View>
                    {children}
                </View>
            </View>
        </Modal>
    );
}
export default CreateStoreModal;