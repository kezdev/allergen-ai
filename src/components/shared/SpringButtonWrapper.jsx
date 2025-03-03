import React, { useRef } from "react";
import {Animated, StyleSheet, Pressable} from "react-native";

const SpringButtonWrapper = ({ disabled = false, children, onClick }) => {

    const scaleValue = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        if (disabled) return;

        Animated.timing(scaleValue, {
            toValue: 0.9,
            duration: 100,
            useNativeDriver: true,
        }).start();
    }

    const handlePressOut = () => {
        if (disabled) return;
        Animated.timing(scaleValue, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
        }).start();

        setTimeout(() => {
            onClick();
        }, 100);
    }

    return (
        <Pressable
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            disabled={disabled}
        >
            <Animated.View style={[
                styles.container,
                { transform: [{ scale: scaleValue }] },
                disabled && styles.disabled,
            ]}>
                {children}
            </Animated.View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    disabled: {
        opacity: 0.8,
    },
});

export default SpringButtonWrapper;