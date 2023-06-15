import { StatusBar } from 'expo-status-bar';

import { useEffect } from 'react';
import * as NavigationBar from 'expo-navigation-bar';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import tw from 'twrnc';

export default function ModalScreen() {

  useEffect(() => {
    NavigationBar.setBackgroundColorAsync("white");

    return () => {
      NavigationBar.setBackgroundColorAsync("#E5E5CB");

    }

  }, [])

  return (
    <View style={tw``}>
      <StatusBar backgroundColor='white' style={'dark'} />
    </View>
  );
}
