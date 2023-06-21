import { Stack, router } from 'expo-router';
import { View, Text } from '../components/Themed';
import tw from '../components/utils/tailwind';
import { FontAwesome } from '@expo/vector-icons';
import { Pressable, useColorScheme } from 'react-native';
import Colors from '../constants/Colors';


interface DialogComponentProps {
    isVisible?: boolean;
    children?: React.ReactNode;
    onClose?: () => void;
    title?: string;
    text?: string;
    callback?: () => void;
    type?: string;
}

export const DialogComponent: React.FC<DialogComponentProps> = ({ isVisible, children, onClose, title, text, callback, type }) => {

    const colorScheme = useColorScheme();

    return (
        <View style={tw`w-full h-full bg-transparent  justify-center items-center`}>
            <Stack.Screen options={{
                title: title,
            }} />
            <View style={tw`w-4/5 h-1/4 pt-10 relative rounded-lg shadow-lg border-slate-300 dark:border-slate-700 dark:shadow-slate-300 border-2 border-solid justify-start items-center`}>
                {/* <Pressable style={tw`absolute top-5 right-5`} onPress={() => {
                    router.back()
                }}>
                    {({ pressed }) => (
                        <FontAwesome
                            name="close"
                            size={30}
                            color={Colors[colorScheme ?? 'light'].text}
                            style={tw.style({
                                'opacity-50': pressed
                            })}
                        />
                    )}
                </Pressable> */}
                <Text>{title}</Text>
                <View style={tw`absolute w-full h-24 p-5 bottom-0 flex-row justify-end items-center`}>
                    <Pressable onPress={() => {
                        callback && callback()
                    }} style={tw`mr-5 min-w-[80px] max-w-[140px] bg-blue-500 dark:bg-slate-700 rounded h-10 justify-center items-center`}>
                        <Text style={tw`text-white`}>Ok</Text>
                    </Pressable>
                    <Pressable onPress={() => router.back()} style={tw`min-w-[80px] max-w-[140px] bg-blue-500 dark:bg-slate-700 rounded h-10 justify-center items-center`}>
                        <Text style={tw`text-white`}>Cancelar</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}
