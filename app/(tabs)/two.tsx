import { StyleSheet } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';

/* 

const ws = new WebSocket("wss://websocketscustomdomain.up.railway.app", 'ordersReciever');

// Connection opened
ws.addEventListener("open", (event) => {
  console.log('%c (ordersReciever) Connection opened', 'background: orange; color: black;', event);
});

// Listen for messages
ws.addEventListener("message", (event) => {
  console.log("Message from server ", event.data);
  console.log('%c (ordersReciever) Message from server:', 'background: yellow; color: black;', event.data);
});

ws.addEventListener('close', (event) => {
  console.log('%c (ordersReciever) Connection closed', 'background: orange; color: black;', event);
});

ws.addEventListener('error', (error) => {
  console.log('%c (ordersReciever) WebSocket error', 'background: red; color: black;', error);
});

*/

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/two.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
