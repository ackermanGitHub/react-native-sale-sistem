import React, { useRef } from 'react'
import Animated, { EasingNode } from 'react-native-reanimated';

const useFadeIn = ({ defaultValue = false }) => {

    const [isVisible, setIsVisible] = React.useState(defaultValue);
    const fadeAnim = useRef(new Animated.Value(1)).current;

    const fadeIn = () => {
        setIsVisible(false)
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            easing: EasingNode.linear,
        }).start();
    };

    const fadeOut = () => {
        setIsVisible(true)
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            easing: EasingNode.linear,
        }).start();
    };

    const fadeInOut = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 50,
            easing: EasingNode.linear,
        }).start(() => {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 50,
                easing: EasingNode.linear,
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