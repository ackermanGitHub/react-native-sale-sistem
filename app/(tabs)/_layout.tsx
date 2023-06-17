import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';
import { useUser } from "@clerk/clerk-expo";
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
  const { isSignedIn } = useUser()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Cajero',
          tabBarIcon: ({ color }) => <TabBarIcon name="cart-arrow-down" color={color} />,
          tabBarLabel: ({ color, children }) => (
            <></>
          ),
          headerRight: () => (
            <View style={tw`flex-row gap-4 items-center justify-center bg-transparent`}>
              <Link href="/no-page" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome
                      name="bug"
                      size={30}
                      color={Colors[colorScheme ?? 'light'].text}
                      style={tw.style('mr-4', {
                        'opacity-50': pressed
                      })}
                    />
                  )}
                </Pressable>
              </Link>
              <Link href="/modal" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome
                      name="info-circle"
                      size={30}
                      color={Colors[colorScheme ?? 'light'].text}
                      style={tw.style('mr-4', {
                        'opacity-50': pressed
                      })}
                    />
                  )}
                </Pressable>
              </Link>
              {isSignedIn && <Link href={"/profile"} asChild>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome
                      name="user-circle"
                      size={30}
                      color={Colors[colorScheme ?? 'light'].text}
                      style={tw.style('mr-4', {
                        'opacity-50': pressed
                      })}
                    />
                  )}
                </Pressable>
              </Link>}
              {!isSignedIn && <Link href={'/sign-in'} asChild>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome
                      name="sign-in"
                      size={30}
                      color={Colors[colorScheme ?? 'light'].text}
                      style={tw.style('mr-4', {
                        'opacity-50': pressed
                      })}
                    />
                  )}
                </Pressable>
              </Link>}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Órdenes',
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
          tabBarLabel: ({ color, children }) => (
            <></>
          ),
          headerRight: () => (
            <View style={tw`flex-row gap-4 items-center justify-center bg-transparent`}>
              <Link href="/no-page" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome
                      name="bug"
                      size={30}
                      color={Colors[colorScheme ?? 'light'].text}
                      style={tw.style('mr-4', {
                        'opacity-50': pressed
                      })}
                    />
                  )}
                </Pressable>
              </Link>
              <Link href="/modal" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome
                      name="info-circle"
                      size={30}
                      color={Colors[colorScheme ?? 'light'].text}
                      style={tw.style('mr-4', {
                        'opacity-50': pressed
                      })}
                    />
                  )}
                </Pressable>
              </Link>
              {isSignedIn && <Link href={"/profile"} asChild>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome
                      name="user-circle"
                      size={30}
                      color={Colors[colorScheme ?? 'light'].text}
                      style={tw.style('mr-4', {
                        'opacity-50': pressed
                      })}
                    />
                  )}
                </Pressable>
              </Link>}
              {!isSignedIn && <Link href={'/sign-in'} asChild>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome
                      name="sign-in"
                      size={30}
                      color={Colors[colorScheme ?? 'light'].text}
                      style={tw.style('mr-4', {
                        'opacity-50': pressed
                      })}
                    />
                  )}
                </Pressable>
              </Link>}
            </View>
          ),
        }}

      />
    </Tabs>
  );
}
