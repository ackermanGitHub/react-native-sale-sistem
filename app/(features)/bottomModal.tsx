import { Stack, useRouter } from 'expo-router';
import { View, Text } from '../../components/theme/Themed';
import tw from '../../components/utils/tailwind';
import { FontAwesome } from '@expo/vector-icons';
import { Pressable, useColorScheme } from 'react-native';
import Colors from '../../constants/Colors';
import BottomSheetModalContainer from '../../components/layout/BottomDrawer';
import { useState } from 'react';

export default function DialogComponent() {
    const router = useRouter()
    const colorScheme = useColorScheme();
    const [isModalVisible, setIsModalVisible] = useState(true);

    return (
        <View style={tw`w-full h-full bg-transparent justify-center items-center`}>
            <Stack.Screen options={{
                title: 'Bottom Modal',
            }} />
            <Pressable style={tw`absolute top-5 right-5`} onPress={() => {
                router.back()
            }}>
                {({ pressed }) => (
                    <FontAwesome
                        name="close"
                        size={30}
                        color={Colors[colorScheme ?? 'light'].text}
                        style={tw.style({
                            'opacity-50': pressed
                        })}
                    />
                )}
            </Pressable>
            <BottomSheetModalContainer isOpen={isModalVisible} setIsOpen={setIsModalVisible} />
        </View>
    );
}
