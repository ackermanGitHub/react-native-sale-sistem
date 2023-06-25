import React, { useState } from 'react';
import { View, Pressable, Animated, useColorScheme, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import tw from './utils/tailwind';
import usePressIn from '../hooks/usePressIn';
import useFadeIn from '../hooks/useFadeIn';

const PressableWithEffect = () => {

    const colorScheme = useColorScheme()

    const { animatedValue, handlePressIn, handlePressOut } = usePressIn()
    const { fadeAnim, fadeIn, fadeOut, isVisible } = useFadeIn()

    return (
        <Pressable
            style={[tw`justify-center items-center p-2 absolute top-5 right-5`]}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={() => {
                if (isVisible) {
                    fadeOut()
                } else {
                    fadeIn()
                }
            }}
        >
            {({ pressed }) => (
                <Animated.View
                    style={[
                        tw`items-center justify-center overflow-hidden`,
                        {
                            transform: [{ scale: animatedValue }],
                        },
                    ]}
                >
                    <Animated.View
                        style={[
                            tw`absolute w-full h-full px-3 justify-center items-center overflow-hidden`,
                            {
                                opacity: fadeAnim,
                                transform: [{ rotate: '45deg' }],
                            },
                        ]}
                    >
                        <View style={tw`h-full w-[2px] bg-black`}></View>
                    </Animated.View>
                    <AntDesign
                        name={colorScheme === 'dark' ? 'pushpin' : 'pushpino'}
                        size={20}
                        color={'black'}
                    />
                </Animated.View>
            )}
        </Pressable>
    );
};
export default PressableWithEffect;