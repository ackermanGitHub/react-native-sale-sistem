import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import tw from '../utils/tailwind';
import { Text, View } from '../theme/Themed';
import { useColorScheme } from 'react-native';

const OrderList = () => {
    const [orders, setOrders] = useState<string[]>([]);
    const [ws, setWs] = useState<WebSocket | null>(null);

    const colorScheme = useColorScheme();

    const handleWebSocketMessage = (event: MessageEvent) => {
        console.log(event.data)
        setOrders((prevOrders) => [...prevOrders, event.data]);
    };
    useEffect(() => {
        const ws = new WebSocket("ws://192.168.194.191:3333", 'ordersReciever');
        setWs(ws);

        ws.addEventListener("open", (event) => {
            console.log('%c (ordersSender) Connection opened', 'background: orange; color: black;', event);
        });

        ws.addEventListener('message', handleWebSocketMessage);

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
    const renderItem = ({ item }: { item: string }) => (
        <View style={tw`p-4 border-b-gray-400 bg-transparent`}>
            <Text style={tw`text-base`}>{item}</Text>
        </View>
    );
    const itemSeparator = () => (
        <View style={tw`self-center bg-[#777777] h-[1px] w-full`} />
    );
    return (
        <View style={tw`bg-[#fff] dark:bg-gray-900 w-4/5 h-4/5 rounded-md shadow-lg items-center overflow-scroll`}>
            <FlatList
                data={orders}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={itemSeparator}
            />
        </View>
    );
};

export default OrderList;


/* 

const construeOrder = (order: string) => {
        const regex = /^(\d+)(\w+)$/;
        const match = order.match(regex);
        if (!match) {
            throw new Error('Invalid order string format');
        }
        const number = parseInt(match[1], 10);
        let word = match[2];

        switch (word) {
            case 'PJ':
                if (number > 1) {
                    word = 'Panes con Jamón'
                } else {
                    word = 'Pan con Jamón'
                }
                break;

            case 'PJQ':
                if (number > 1) {
                    word = 'Panes con Jamón y Queso'
                } else {
                    word = 'Pan con Jamón Queso'
                }
                break;

            default:
                if (number > 1) {
                    word += 's'
                }
                break;
        }
        return `${number} ${word}`;
    }

function numberToWords(number) {
  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const tens = ['', 'Ten', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  const teens = ['Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const thousands = ['', 'Thousand', 'Million', 'Billion', 'Trillion'];

  if (number === 0) {
    return 'Zero';
  }

  let word = '';
  for (let i = 0; number > 0; i++) {
    if (number % 1000 !== 0) {
      word = `${numberToWordsHelper(number % 1000)} ${thousands[i]} ${word}`;
    }
    number = Math.floor(number / 1000);
  }

  return word.trim();
}

function numberToWordsHelper(number) {
  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const tens = ['', 'Ten', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  const teens = ['Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];

  let word = '';
  if (number % 100 < 10) {
    word = ones[number % 10];
    number = Math.floor(number / 10);
  } else if (number % 100 < 20) {
    word = teens[number % 10 - 1];
    number = Math.floor(number / 100);
  } else {
    word = ones[number % 10];
    number = Math.floor(number / 10);

    word = tens[number % 10] + ' ' + word;
    number = Math.floor(number / 10);
  }

  if (number === 0) {
    return word;
  }

  return `${ones[number]} Hundred ${word}`;
}
*/