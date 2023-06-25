import React from 'react'
import { Animated } from 'react-native';

const usePressIn = () => {

    const animatedValue = React.useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.timing(animatedValue, {
            toValue: 0.85,
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
    };

    const pressInOut = () => {
        Animated.timing(animatedValue, {
            toValue: 0.85,
            duration: 75,
            useNativeDriver: false,
        }).start(() => {
            Animated.timing(animatedValue, {
                toValue: 1,
                duration: 50,
                useNativeDriver: false,
            }).start();
        });
    };

    return {
        animatedValue,
        handlePressIn,
        handlePressOut,
        pressInOut
    }
}

export default usePressIn