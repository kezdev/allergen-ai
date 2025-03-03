import React, { useEffect, useState } from "react";
import {View, Text, Image, ActivityIndicator, StyleSheet, Pressable, SafeAreaView, ScrollView} from "react-native";
import {analyseImage} from "../../../helpers/AIHelper";
import {Theme} from "../../../styles/Theme";
import {StatusBar} from "expo-status-bar";
import WarningMessage from "../../../components/results/WarningMessage";
import BlackButton from "../../../components/shared/BlackButton";
import {Ionicons} from "@expo/vector-icons";

const ResultsScreen = ({ route, navigation }) => {
    const { photoUri, allergens } = route.params;
    const [AIResponse, setAIResponse] = useState(null);
    const [loading, setLoading] = useState(true);

    const strippedAllergens = allergens.map(allergen => allergen.substring(3));

    useEffect(() => {
        const fetchAnalysis = async () => {
            try {
                const response = await analyseImage(photoUri, strippedAllergens);
                setAIResponse(response);
            } catch (error) {
                console.error("Error analyzing image:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAnalysis();
    }, [photoUri, allergens]);

    const scanAgain = () => {
        navigation.goBack();
    }

    return (
        <>
            <StatusBar style="dark" />
            <SafeAreaView />
            <View style={styles.container}>
                <Pressable onPress={() => navigation.goBack()} hitSlop={20} style={{ marginBottom: 20 }}>
                    <Ionicons name="arrow-back-outline" size={24} color="black" />
                </Pressable>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50 }}>
                    <Image
                        source={{ uri: photoUri }}
                        style={styles.image}
                        resizeMode="cover"
                    />

                    <Text style={AIResponse?.product_description ? styles.title : styles.loadingTitle}>
                        {AIResponse?.product_description || "Loading..."}
                    </Text>

                    <View style={styles.table}>
                        <View style={styles.headerRow}>
                            <Text style={styles.headingText}>Allergen</Text>
                            <Text style={styles.headingText}>Result</Text>
                        </View>
                        {allergens.map((allergen, index) => (
                            <View key={index} style={[styles.row, { borderBottomWidth: index === allergens.length - 1 ? 0 : 1 }]}>
                                <Text style={styles.allergenName}>{allergen}</Text>
                                <View>
                                    {AIResponse && AIResponse.allergens[strippedAllergens[index]] ? (
                                        <Text style={AIResponse.allergens[strippedAllergens[index]].contains ? styles.containsText : styles.safeText}>
                                            {AIResponse.allergens[strippedAllergens[index]].contains ? "CONTAINS" : "SAFE"}
                                        </Text>
                                    ) : (
                                        <>
                                            <ActivityIndicator size="small" color="#121212" />
                                        </>
                                    )}
                                </View>
                            </View>
                        ))}
                    </View>

                    <WarningMessage />

                    <BlackButton
                        title={"Scan again"}
                        onClick={scanAgain}
                        disabled={loading}
                    />
                </ScrollView>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: Theme.HORIZONTAL_PADDING,
    },
    image: {
        width: '100%',
        height: 220,
        borderRadius: 10,
        shadowColor: Theme.colors.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    title: {
        fontSize: 28,
        marginTop: 20,
        fontFamily: 'Rubik_600SemiBold',
        textAlign: 'center',
    },
    loadingTitle: {
        fontSize: 16,
        marginTop: 20,
        fontFamily: 'Rubik_600SemiBold',
        textAlign: 'center',
    },
    table: {
        backgroundColor: Theme.colors.white,
        borderRadius: 10,
        marginTop: 20,
    },
    headerRow: {
        backgroundColor: Theme.colors.primary,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    row: {
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },
    headingText: {
        fontSize: 16,
        fontFamily: 'Rubik_600SemiBold',
    },
    allergenName: {
        fontSize: 16,
        fontFamily: 'Rubik_400Regular',
    },
    containsText: {
        color: 'red',
        fontFamily: 'Rubik_600SemiBold',
    },
    safeText: {
        color: 'green',
        fontFamily: 'Rubik_600SemiBold',
    }
});

export default ResultsScreen;
