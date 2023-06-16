import { Stack } from 'expo-router';
import { View } from '../components/Themed';
import tw from 'twrnc';

export default function ModalScreen() {

  return (
    <View style={tw`w-full h-full bg-[#E5E5CB]`}>
      <Stack.Screen options={{
        title: 'Modal',
        headerStyle: {
          backgroundColor: '#E5E5CB',
        }
      }} />
    </View>
  );
}
