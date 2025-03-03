import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import EvilIcons from '@expo/vector-icons/EvilIcons';

const SearchInput = ({ placeholder, onChangeText }) => {
    return (
        <View style={styles.container}>
            <View style={styles.icon}>
                <EvilIcons name="search" size={24} color="#ccc" />
            </View>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor="#ccc"
                onChangeText={onChangeText}
            />
        </View>
    )
}

export default SearchInput;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        backgroundColor: "#f9f9f9",
    },
    input: {
        flex: 1,
        padding: 10,
    },
    icon: {
        paddingLeft: 10,
    }
});