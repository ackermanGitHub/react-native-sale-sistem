import React, { useRef } from 'react'
import { Animated } from 'react-native';

const useFadeIn = ({ defaultValue = false }) => {

    const [isVisible, setIsVisible] = React.useState(defaultValue);
    const fadeAnim = useRef(new Animated.Value(1)).current;

    const fadeIn = () => {
        setIsVisible(true);
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 60,
            useNativeDriver: true,
        }).start();
    };

    const fadeOut = () => {
        setIsVisible(false);
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 50,
            useNativeDriver: true,
        }).start();
    };

    const fadeInOut = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 50,
            useNativeDriver: false,
        }).start(() => {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 50,
                useNativeDriver: false,
            }).start();
        });
    };

    return {
        fadeAnim,
        fadeIn,
        fadeOut,
        fadeInOut,
        isVisible
    }
}

export default useFadeIn