import { View } from '../../components/theme/Themed';
import React, { useState, useEffect } from 'react';
import NumberKeyboard from '../../components/shop/NumbersKeyboard';
import ProductsRow from '../../components/shop/ProductsRow';
import OrderScreen from '../../components/shop/OrderScreen';
import tw from '../../components/utils/tailwind';


export default function TabOneScreen() {

  const [order, setOrder] = useState<(number | string)[]>([])
  const [ws, setWs] = useState<WebSocket | null>(null);

  const handleWebSocketMessage = (event: MessageEvent) => {
    const message = event.data;
    // do something with the message, e.g. update the order state
    setOrder(currentOrder => [...currentOrder, message]);
  };

  useEffect(() => {
    const ws = new WebSocket("ws://192.168.9.191:3333", 'ordersSender');
    setWs(ws);

    ws.addEventListener("open", (event) => {
      console.log('%c (ordersSender) Connection opened', 'background: orange; color: black;', event);
    });

    ws.addEventListener("message", handleWebSocketMessage);

    ws.addEventListener('close', (event) => {
      console.log('%c (ordersSender) Connection closed', 'background: orange; color: black;', event);
    });

    ws.addEventListener('error', (error) => {
      console.log('%c (ordersSender) WebSocket error', 'background: red; color: black;', error);
    });

    return () => {
      ws.removeEventListener("message", handleWebSocketMessage);
      ws.close();
    };
  }, []);

  const handlePressNum = (newOrder: number) => {
    const lastValue = order[order.length - 1];
    if (typeof lastValue === 'number') {
      setOrder([...order.slice(0, -1), concatenateDigits(lastValue, newOrder)])
    } else {
      setOrder([...order, newOrder])
    }
  }

  const handlePressProd = (newOrder: string) => {
    setOrder([...order, newOrder])
  }

  const handleCancel = () => {
    console.log({
      order: order,
      joinStringOrder: joinStringOrder(order),
      joinStringOrderJoin: joinStringOrder(order).join('+'),
    })
    setOrder([])
  }

  const handleConfirm = () => {
    console.log('Order: ', joinStringOrder(order).join('+'))
    if (ws) {
      ws.send(joinStringOrder(order).join('+'))
    }
    setOrder([])
  };

  const joinStringOrder = (array: (number | string)[]) => {
    const joinedArr: string[] = [];
    for (let i = 0; i < array.length; i++) {
      if (typeof array[i] === 'number') {
        if (typeof array[i + 1] === 'string') {
          joinedArr.push(`${array[i]}${array[i + 1]}`);
        } else {
          joinedArr.push(`${array[i]}`);
        }
      }
    }
    return joinedArr;
  }

  const concatenateDigits = (num1 = 0, num2 = 0) => {
    return Number(`${num1}${num2}`);
  }


  return (
    <View nativeID='Tab-One-Container' style={tw`w-full h-full justify-center items-center`}>

      <View nativeID='cashierContainer' style={tw`w-full h-full justify-center items-center py-4`}>

        <OrderScreen order={joinStringOrder(order).join('+')} />

        <ProductsRow handlePress={handlePressProd} />

        <NumberKeyboard handlePress={handlePressNum} handleCancel={handleCancel} handleConfirm={handleConfirm} />

      </View>

    </View>
  );
}