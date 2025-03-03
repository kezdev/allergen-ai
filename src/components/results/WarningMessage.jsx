import React from "react";
import { View, Text, StyleSheet } from "react-native";

const WarningMessage = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.emoji}>⚠️</Text>
            <Text style={styles.text}>This app utilises AI and may not always be 100% accurate. Please verify labels for accuracy.</Text>
        </View>
    )
}

export default WarningMessage;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'white',
        borderRadius: 10,
        marginVertical: 20,
        padding: 20,
    },
    emoji: {
        fontSize: 22,
    },
    text: {
        paddingLeft: 10,
        fontSize: 12,
        fontFamily: 'Rubik_700Bold',
        color: '#666',
    },
});