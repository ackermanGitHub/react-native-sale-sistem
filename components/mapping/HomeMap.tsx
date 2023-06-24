import * as React from 'react';
import { Button } from 'react-native';
import { View } from '../theme/Themed';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import FunctionalSnack from '../../app/(stack)/map/snack';

function NotificationsScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button onPress={() => navigation.goBack()} title="Go back home" />
        </View>
    );
}

const Drawer = createDrawerNavigator();

export default function HomeMap() {
    return (
        <NavigationContainer independent>
            <Drawer.Navigator initialRouteName="Home">
                <Drawer.Screen options={{
                    header: () => <View></View>
                }} name="Map" component={FunctionalSnack} />
                <Drawer.Screen name="Notifications" component={NotificationsScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}