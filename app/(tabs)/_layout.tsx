import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme, Text } from 'react-native';

import Colors from '../../constants/Colors';

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

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarActiveBackgroundColor: ''
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
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={30}
                    /* color={Colors[colorScheme ?? 'light'].text} */
                    color={"#111111"}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Órdenes',
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={"#111111"} />,
          tabBarLabel: ({ color, children }) => (
            <></>
          ),
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={30}
                    /* color={Colors[colorScheme ?? 'light'].text} */
                    color={"#111111"}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}

      />
    </Tabs>
  );
}
