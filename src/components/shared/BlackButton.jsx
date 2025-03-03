import React from "react";
import { View, Text, StyleSheet } from "react-native";
import SpringButtonWrapper from "./SpringButtonWrapper";
import {Theme} from "../../styles/Theme";

const BlackButton = ({ title, onClick, disabled = false }) => {
    return (
        <SpringButtonWrapper onClick={onClick} disabled={disabled}>
            <View style={styles.button}>
                <Text style={styles.text}>{title}</Text>
            </View>
        </SpringButtonWrapper>
    );
}

export default BlackButton;

const styles = StyleSheet.create({
    button: {
        backgroundColor: Theme.colors.black,
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
    },
    text: {
        color: Theme.colors.white,
        fontSize: 18,
        fontFamily: "Rubik_600SemiBold",
    },
});