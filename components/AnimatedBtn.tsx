import * as React from 'react';
import {
    StatusBar,
    Dimensions,
    TouchableOpacity,
    Animated,
    StyleSheet,
    Pressable
} from 'react-native';
import Constants from 'expo-constants';
import { AntDesign } from '@expo/vector-icons';
import tw from './utils/tailwind';
import { View, ViewProps, Text, TextProps } from './Themed';
const { width } = Dimensions.get('window');

const AnimatedAntDesign = Animated.createAnimatedComponent(AntDesign);


type AnimatedButtonProps = {
    onPress?: () => void;
} & Animated.AnimatedProps<ViewProps>;

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({ onPress, style, children, ...otherProps }) => {

    const animatedValue = React.useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.timing(animatedValue, {
            toValue: 0.9,
            duration: 75,
            useNativeDriver: true,
        }).start();
    };
    const handlePressOut = () => {
        Animated.timing(animatedValue, {
            toValue: 1,
            duration: 50,
            useNativeDriver: true,
        }).start();
        onPress && onPress();
    };

    return (

        <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut}>
            <Animated.View
                {...otherProps}
                style={[
                    style,
                    {
                        transform: [{ scale: animatedValue }],
                    },
                ]}
            >
                {children}
            </Animated.View>
        </Pressable>
    );
}