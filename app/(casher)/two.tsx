import { View } from '../../components/Themed';
import OrderList from '../../components/OrderList';
import tw from 'twrnc';

export default function TabTwoScreen() {
  return (
    <View style={tw`flex-1 items-center justify-center `}>
      <View style={tw`my-7 h-[1px] w-[4/5]`} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <OrderList />
      <View style={tw`my-7 h-[1px] w-[4/5]`} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </View>
  );
}
