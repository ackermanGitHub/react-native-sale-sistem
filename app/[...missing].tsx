import { Link, Stack } from 'expo-router';

import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import tw from 'twrnc';

import { Text, View } from '../components/Themed';

export default function NotFoundScreen() {

  return (
    <>
      <Stack.Screen options={{
        title: 'Oops!',
        headerStyle: {
          backgroundColor: '#E5E5CB',
        }
      }} />
      <View style={tw`flex-1 justify-center bg-[#E5E5CB] items-center p-5`}>
        <Text style={tw`text-xl text-black font-bold`}>This screen doesn't exist.</Text>

        <Link href="/" style={tw`mt-4 py-4`}>
          <Text style={tw`text-sm text-[#2e78b7]`}>Go to home screen!</Text>
        </Link>
      </View>
      <StatusBar style={'dark'} backgroundColor='white' />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
