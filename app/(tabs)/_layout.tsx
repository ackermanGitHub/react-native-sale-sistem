import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';
import tw from 'twrnc';

import Colors from '../../constants/Colors';
import { View } from '../../components/Themed';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isLoggedIn = true;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarActiveBackgroundColor: '#E5E5CB',
        tabBarInactiveBackgroundColor: '#E5E5CB',
        headerBackground: () => {
          return (
            <View style={tw`w-full h-full bg-[#E5E5CB]`}></View>
          )
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Cajero',
          headerTintColor: "#111111",
          tabBarIcon: ({ color }) => <TabBarIcon name="cart-arrow-down" color={"#777777"} />,
          tabBarLabel: ({ color, children }) => (
            <></>
          ),
          headerRight: () => (
            <View style={tw`flex-row gap-4 items-center justify-center bg-transparent`}>
              <Link href="/modal" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome
                      name="info-circle"
                      size={30}
                      /* color={Colors[colorScheme ?? 'light'].text} */
                      color={"#777777"}
                      style={tw.style('mr-4', {
                        'opacity-50': pressed
                      })}
                    />
                  )}
                </Pressable>
              </Link>
              <Link href={isLoggedIn ? "/profile" : '/sign-in'} asChild>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome
                      name="user-circle"
                      size={30}
                      /* color={Colors[colorScheme ?? 'light'].text} */
                      color={"#777777"}
                      style={tw.style('mr-4', {
                        'opacity-50': pressed
                      })}
                    />
                  )}
                </Pressable>
              </Link>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Órdenes',
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={"#777777"} />,
          tabBarLabel: ({ color, children }) => (
            <></>
          ),
          headerRight: () => (
            <View style={tw`flex-row gap-4 items-center justify-center bg-transparent`}>
              <Link href="/modal" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome
                      name="info-circle"
                      size={30}
                      /* color={Colors[colorScheme ?? 'light'].text} */
                      color={"#777777"}
                      style={tw.style('mr-4', {
                        'opacity-50': pressed
                      })}
                    />
                  )}
                </Pressable>
              </Link>
              <Link href={isLoggedIn ? "/profile" : '/sign-in'} asChild>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome
                      name="user-circle"
                      size={30}
                      /* color={Colors[colorScheme ?? 'light'].text} */
                      color={"#777777"}
                      style={tw.style('mr-4', {
                        'opacity-50': pressed
                      })}
                    />
                  )}
                </Pressable>
              </Link>
            </View>
          ),
        }}

      />
    </Tabs>
  );
}
