import React, { useRef, useEffect } from "react";
import { SafeAreaView, StyleSheet, Animated } from "react-native";
import { Theme } from "../../styles/Theme";

const LoadingScreen = () => {
    const spinValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const spinAnimation = Animated.loop(
            Animated.timing(spinValue, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            })
        );
        spinAnimation.start();

        return () => spinAnimation.stop();
    }, [spinValue]);

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"],
    });

    return (
        <SafeAreaView style={styles.container}>
            <Animated.View style={[styles.loader, { transform: [{ rotate: spin }] }]} />
        </SafeAreaView>
    );
}

export default LoadingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Theme.colors.background,
    },
    loader: {
        width: 50,
        height: 50,
        borderLeftWidth: 7,
        borderBottomWidth: 7,
        borderColor: Theme.colors.primary,
        borderRadius: 100,
    },
});