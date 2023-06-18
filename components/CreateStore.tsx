import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react'
import tw from 'twrnc';

const CreateStoreModal: React.FC<{ isVisible: boolean, children: React.ReactNode, onClose: () => void }> = ({ isVisible, children, onClose }) => {
    return (
        <Modal animationType="slide" transparent={true} visible={isVisible}>
            <View style={tw`h-1/4 w-full bg-[##25292e] rounded-t-xl absolute bottom-0`}>
                <View style={tw`h-[16%] bg-[#464C55] rounded-t-md px-5 flex-row justify-between items-center`}>
                    <Text style={tw`text-[#fff] text-sm`}>Choose a sticker</Text>
                    <Pressable onPress={onClose}>
                        <MaterialIcons name="close" color="#fff" size={22} />
                    </Pressable>
                </View>
                {children}
            </View>
        </Modal>
    );
}
export default CreateStoreModal;