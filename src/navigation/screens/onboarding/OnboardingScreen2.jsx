import React, { useEffect, useState } from "react";
import {View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView} from "react-native";
import { completeOnboarding } from "../../../helpers/authHelper";
import { getGlobalAllergens } from "../../../helpers/globalHelper";
import { saveUserAllergens } from "../../../helpers/userHelper";
import { Theme } from "../../../styles/Theme";
import BlackButton from "../../../components/shared/BlackButton";
import SearchInput from "../../../components/shared/SearchInput";

const OnboardingScreen2 = () => {
    const [loading, setLoading] = useState(true);
    const [selectedAllergens, setSelectedAllergens] = useState([]);
    const [allergens, setAllergens] = useState([]);
    const [filteredAllergens, setFilteredAllergens] = useState([]);

    useEffect(() => {
        fetchAllergens();
    }, []);

    if (loading) {
        return null;
    }

    const fetchAllergens = async () => {
        const result = await getGlobalAllergens();
        setAllergens(result);
        setFilteredAllergens(result);
        setLoading(false);
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
        await completeOnboarding();
    }

    return (
        <>
            <SafeAreaView />
            <View style={styles.container}>
                <Text style={styles.title}>Your allergens</Text>
                <Text style={styles.subtitle}>Select the allergens you want to test for</Text>

                <SearchInput
                    placeholder={"Search allergens"}
                    onChangeText={searchAllergens}
                />

                <ScrollView
                    contentContainerStyle={styles.allergenList}
                    showsVerticalScrollIndicator={false}
                >
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
                </ScrollView>

                <BlackButton
                    title={"Continue"}
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

export default OnboardingScreen2;