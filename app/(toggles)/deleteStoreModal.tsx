import { Stack, router } from 'expo-router';
import { View, Text } from '../../components/Themed';
import tw from '../../components/utils/tailwind';
import { FontAwesome } from '@expo/vector-icons';
import { Pressable, useColorScheme } from 'react-native';
import Colors from '../../constants/Colors';
import ModalContainer from './modal';
import { useRouter } from 'expo-router';

export default function DeleteStoreModal() {
    const router = useRouter()

    const colorScheme = useColorScheme();

    return (
        <>
            <ModalContainer />
            {/* <View style={tw`w-full h-full bg-transparent justify-center items-center`}>
                    <Pressable onPress={() => router.back()} style={tw`h-full w-full flex justify-center items-center relative bg-transparent`}>
                    </Pressable>
                </View> */}
        </>
    );
}
