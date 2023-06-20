import { Link, Stack } from 'expo-router';
import tw from '../components/utils/tailwind';

import { Text, View } from '../components/Themed';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{
        title: 'Oops!',
      }} />
      <View style={tw`flex-1 justify-center items-center p-5`}>
        <Text style={tw`text-xl font-bold`}>This screen doesn't exist.</Text>

        <Link href="/" style={tw`mt-4 py-4`}>
          <Text style={tw`text-sm text-[#2e78b7]`}>Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}
