import React, { useState } from "react";
import {StyleSheet, Pressable, Animated, Image} from "react-native";
import {Theme} from "../../styles/Theme";

const CameraButton = ({ onPress }) => {
    const [scale] = useState(new Animated.Value(1));

    const handlePressIn = () => {
        Animated.spring(scale, {
            toValue: 0.8,
            useNativeDriver: true,
        }).start();
    }

    const handlePressOut = () => {
        Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    }

    return (
        <Pressable
            style={styles.container}
            onPress={onPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
        >
            <Animated.View
                style={[
                    styles.button,
                    { transform: [{ scale }] },
                ]}
            >
                <Image
                    source={require('../../../assets/scan.png')}
                    style={{ width: 45 }}
                    resizeMode="contain"
                />
            </Animated.View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 110,
        height: 110,
        borderRadius: 110,
        borderColor: Theme.colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Theme.colors.white,
    },
    button: {
        width: 90,
        height: 90,
        borderRadius: 100,
        backgroundColor: Theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default CameraButton;