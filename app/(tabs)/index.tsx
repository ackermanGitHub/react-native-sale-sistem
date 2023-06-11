import { StyleSheet, Button } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import NumberKeyboard from '../../components/NumbersKeyboard';
import ProductsRow from '../../components/ProductsRow';
import ConfirmBtn from '../../components/ConfirmBtn';
import OrderScreen from '../../components/OrderScreen';

const ws = new WebSocket("wss://websocketscustomdomain.up.railway.app", 'ordersSender');

// Connection opened
ws.addEventListener("open", (event) => {
  console.log('%c (ordersSender) Connection opened', 'background: orange; color: black;', event);
});

// Listen for messages
ws.addEventListener("message", (event) => {
  console.log('%c (ordersSender) Message from server:', 'background: yellow; color: black;', event.data);
});

ws.addEventListener('close', (event) => {
  console.log('%c (ordersSender) Connection closed', 'background: orange; color: black;', event);
});

ws.addEventListener('error', (error) => {
  console.log('%c (ordersSender) WebSocket error', 'background: red; color: black;', error);
});

export default function TabOneScreen() {
  /* const [res, setRes] = React.useState<string>();

  React.useEffect(() => {
    fetch('https://websocketscustomdomain.up.railway.app/')
      .then((response) => { 
        // console.log({ responseOk: response.ok, response });
        // response.json() expects the response from fetch to be in JSON format. which it will then automatically put in JSON.parse to convert it to a javascript object.
        return response.text();
        // return response.json();
      })
      .then(data => {
        // console.log({ data: data });
        setRes(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []); */

  return (
    <View nativeID='Tab-One-Container' style={styles.container}>
      {/* 
      <Text>{res}</Text>
      <Button
        onPress={() => {
          // console.log('%c This is a custom message with a blue background color', 'background: blue; color: white;');
          ws.send("Hello Server!");
        }}
        title="Say Hello"
        color="#222222"
        accessibilityLabel="Learn more about this purple button"
      />
      <Text nativeID='Tab-One-Text' style={styles.title}>Tab One</Text>
      <Button
        onPress={() => {
          console.log('Starting SSE connection');
          fetch('https://websocketscustomdomain.up.railway.app/sse')
            .then((response) => {
              // console.log({ responseOk: response.ok, response });
              // return response.text();
              return response.json();
            })
            .then(data => {
              // console.log({ data: data });
              setRes(data);
            })
            .catch(error => {
              console.error(error);
            });
        }}
        title="SSE connection"
        color="#222222"
        accessibilityLabel="Learn more about button"
      /> 
      <View nativeID='separator' style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      */}

      <View nativeID='cashierContainer' style={styles.container}>

        <OrderScreen />

        <ProductsRow handlePress={(string) => {
          console.log(string)
        }} />

        <NumberKeyboard handlePress={(num) => {
          console.log(num)
        }} />

      </View>


      {/* <EditScreenInfo path="app/(tabs)/index.tsx" /> */}
      <StatusBar style={'dark'} backgroundColor='#999999' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: "#2B2A4C",
    alignItems: 'center',
    justifyContent: 'center',
  },
  cashierContainer: {
    height: '100%',
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
    backgroundColor: "#2B2A4C",
  },
});
