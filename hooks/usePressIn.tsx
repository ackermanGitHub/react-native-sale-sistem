import React from 'react'
import Animated, { EasingNode } from 'react-native-reanimated';

const usePressIn = () => {

    const animatedValue = React.useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.timing(animatedValue, {
            toValue: 0.85,
            duration: 75,
            easing: EasingNode.linear,
        }).start();
    };

    const handlePressOut = () => {
        Animated.timing(animatedValue, {
            toValue: 1,
            duration: 50,
            easing: EasingNode.linear,
        }).start();
    };

    const pressInOut = () => {
        Animated.timing(animatedValue, {
            toValue: 0.85,
            duration: 75,
            easing: EasingNode.linear,
        }).start(() => {
            Animated.timing(animatedValue, {
                toValue: 1,
                duration: 50,
                easing: EasingNode.linear,
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