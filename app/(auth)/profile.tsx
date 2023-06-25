import { Stack, Link } from 'expo-router';
import { View, Text } from '../../components/theme/Themed';
import { useColorScheme } from 'react-native';
import tw from '../../components/utils/tailwind';
import { useUser } from "@clerk/clerk-expo";

export default function ProfileRoute() {

    const { user, isLoaded, isSignedIn } = useUser();
    const colorScheme = useColorScheme();

    if (!isLoaded || !isSignedIn) {
        return (
            <View style={tw`h-full w-full justify-center items-center`}>
                <Stack.Screen options={{
                    title: 'Profile',
                }} />
                <Text style={tw`text-xl font-bold`}>User is not signed in</Text>

                <Link href="/(casher)" style={tw`mt-4 py-4`}>
                    <Text style={tw`text-sm text-[#2e78b7]`}>Go to home screen!</Text>
                </Link>

            </View>
        );
    }

    return (
        <View style={tw`h-full w-full justify-center items-center`}>
            <Stack.Screen options={{
                title: 'Profile',
            }} />
            <Text>
                Email: {user.primaryEmailAddress?.emailAddress}
            </Text>

        </View>
    );
}
