import { Stack, router } from 'expo-router';
import { View, Text } from '../components/Themed';
import tw from 'twrnc';
import { FontAwesome } from '@expo/vector-icons';
import { Pressable, useColorScheme } from 'react-native';
import Colors from '../constants/Colors';

export default function ModalScreen() {

  const colorScheme = useColorScheme();

  return (
    <View style={tw`w-full h-full bg-transparent justify-center items-center`}>
      <Stack.Screen options={{
        title: 'Modal',
      }} />
      <View style={tw`w-3/4 h-3/4 relative bg-white rounded-lg shadow-lg justify-center items-center`}>
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
        <Text>This is a modal screen</Text>
      </View>
    </View>
  );
}
