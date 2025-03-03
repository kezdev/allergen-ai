import React from "react";
import {StyleSheet, Image, Pressable} from "react-native";

const CameraSettingsButton = ({ onPress }) => {
    return (
        <Pressable style={styles.container} onPress={onPress}>
            <Image
                source={require("../../../assets/settings.png")}
                style={{ width: 28, height: 28 }}
                resizeMode="contain"
            />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 80,
        right: 30,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: 50,
        height: 50,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
    },
});

export default CameraSettingsButton;