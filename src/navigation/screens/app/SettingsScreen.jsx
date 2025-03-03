import React, { useEffect, useState } from "react";
import {View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Pressable} from "react-native";
import { getGlobalAllergens } from "../../../helpers/globalHelper";
import {getUserAllergens, saveUserAllergens} from "../../../helpers/userHelper";
import { Theme } from "../../../styles/Theme";
import {StatusBar} from "expo-status-bar";
import BlackButton from "../../../components/shared/BlackButton";
import SearchInput from "../../../components/shared/SearchInput";
import {Ionicons} from "@expo/vector-icons";

const SettingsScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(true);
    const [selectedAllergens, setSelectedAllergens] = useState([]);

    const [allergens, setAllergens] = useState([]);
    const [filteredAllergens, setFilteredAllergens] = useState([]);

    const fetchData = async () => {
        try {
            const [globalAllergens, userAllergens] = await Promise.all([
                getGlobalAllergens(),
                getUserAllergens()
            ]);

            setAllergens(globalAllergens);
            setFilteredAllergens(globalAllergens);
            setSelectedAllergens(userAllergens);
        } catch (error) {
            console.error("Error fetching allergens:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return null;
    }

    const searchAllergens = (text) => {
        const result = allergens.filter(allergen => allergen.toLowerCase().includes(text.toLowerCase()));
        setFilteredAllergens(result);
    }

    const handleToggleAllergen = (allergen) => {
        if (selectedAllergens.includes(allergen)) {
            setSelectedAllergens(selectedAllergens.filter(item => item !== allergen));
        } else {
            setSelectedAllergens([...selectedAllergens, allergen]);
        }
    }

    const saveOnboarding = async () => {

        if (selectedAllergens.length === 0) {
            alert("Please select at least one allergen");
            return;
        }

        await saveUserAllergens(selectedAllergens);

        navigation.navigate("CameraScreen");
    }

    return (
        <>
            <StatusBar style="dark" />
            <SafeAreaView />
            <View style={styles.container}>
                <Pressable onPress={() => navigation.goBack()} hitSlop={20}>
                    <Ionicons name="arrow-back-outline" size={24} color="black" />
                </Pressable>
                <Text style={styles.title}>Your allergens</Text>
                <Text style={styles.subtitle}>Select the allergens you want to test for</Text>

                <SearchInput
                    placeholder={"Search allergens"}
                    onChangeText={searchAllergens}
                />

                <View style={styles.allergenList}>
                    {filteredAllergens.map((allergen, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.allergenItem,
                                selectedAllergens.includes(allergen) && styles.selectedAllergen
                            ]}
                            onPress={() => handleToggleAllergen(allergen)}
                        >
                            <Text
                                style={[
                                    styles.allergenText,
                                    selectedAllergens.includes(allergen) && styles.selectedText
                                ]}
                            >
                                {allergen}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <BlackButton
                    title={"Save"}
                    onClick={saveOnboarding}
                    disabled={selectedAllergens.length === 0}
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: Theme.HORIZONTAL_PADDING,
        paddingBottom: 40,
    },
    title: {
        fontSize: 32,
        fontFamily: "Rubik_600SemiBold",
        marginTop: 20,
        marginBottom: 5,
    },
    subtitle: {
        color: "#3F3F3F",
        fontFamily: "Rubik_400Regular",
        fontSize: 16,
        marginBottom: 20,
    },
    allergenList: {
        marginTop: 20,
        marginBottom: 20,
        flex: 1,
    },
    allergenItem: {
        padding: 15,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        backgroundColor: "#f9f9f9",
        borderLeftWidth: 12,
    },
    selectedAllergen: {
        borderColor: Theme.colors.primary,
    },
    allergenText: {
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default SettingsScreen;