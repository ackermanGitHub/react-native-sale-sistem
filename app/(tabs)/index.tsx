import { StyleSheet } from 'react-native';

import { View } from '../../components/Themed';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import NumberKeyboard from '../../components/NumbersKeyboard';
import ProductsRow from '../../components/ProductsRow';
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

  const [order, setOrder] = React.useState<(number | string)[]>([])

  const handlePressNum = (newOrder: number) => {
    const lastValue = order[order.length - 1];
    if (typeof lastValue === 'number') {
      const combinedNumber = Number(`${lastValue}${newOrder}`);
      setOrder([...order.slice(0, -1), combinedNumber])
    } else {
      setOrder([...order, newOrder])
    }
  }

  const handlePressProd = (newOrder: string) => {
    setOrder([...order, newOrder])
  }

  const handleCancel = () => {
    console.log(order)
    setOrder([])
  }

  const handleConfirm = () => {
    console.log('Order: ', joinStringOrder(order).join('+'))
    ws.send(joinStringOrder(order).join('+'))
    setOrder([])
  }

  const joinStringOrder = (array: (number | string)[]) => {
    const joinedArr: string[] = [];

    for (let i = 0; i < array.length - 1; i++) {
      if (typeof array[i] === 'number' && typeof array[i + 1] === 'string') {
        joinedArr.push(`${array[i]}${array[i + 1]}`);
      }
    }

    return joinedArr;
  }


  return (
    <View nativeID='Tab-One-Container' style={styles.container}>

      <View nativeID='cashierContainer' style={styles.container}>

        <OrderScreen order={order.join('')} />

        <ProductsRow handlePress={handlePressProd} />

        <NumberKeyboard handlePress={handlePressNum} handleCancel={handleCancel} handleConfirm={handleConfirm} />

      </View>

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
