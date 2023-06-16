import { Stack } from 'expo-router';
import { View } from '../components/Themed';
import tw from 'twrnc';

export default function ModalScreen() {

    return (
        <View style={tw`h-full bg-[#E5E5CB] w-full`}>
            <Stack.Screen options={{
                title: 'Profile',
                headerStyle: {
                    backgroundColor: '#E5E5CB',
                }
            }} />
        </View>
    );
}
