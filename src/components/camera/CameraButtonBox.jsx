import React from "react";
import { View, StyleSheet, Text } from "react-native";
import CameraButton from "./CameraButton";
import {Theme} from "../../styles/Theme";

const CameraButtonBox = ({ onPress }) => {
    return (
        <View style={styles.container}>
            <View style={styles.cameraBtn}>
                <CameraButton onPress={onPress} />
            </View>
            <Text style={styles.title}>Scan your item</Text>
            <Text style={styles.subtitle}>to check for allergens</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 0,
        alignSelf: "center",
        backgroundColor: 'white',
        width: '100%',
        height: 158,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontFamily: "Rubik_600SemiBold",
        color: Theme.colors.black,
    },
    subtitle: {
        fontSize: 16,
        fontFamily: "Rubik_400Regular",
        color: Theme.colors.black,
        marginTop: 6,
    },
    cameraBtn: {
        position: 'absolute',
        top: -57,
    }
});

export default CameraButtonBox;