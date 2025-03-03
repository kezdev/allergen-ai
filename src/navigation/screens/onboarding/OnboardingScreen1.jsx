import React from "react";
import {View, Text, SafeAreaView, StyleSheet, Image} from "react-native";
import { Theme } from "../../../styles/Theme";
import BlackButton from "../../../components/shared/BlackButton";

const OnboardingScreen1 = ({ navigation }) => {

    const getStarted = async () => {
        navigation.navigate("OnboardingScreen2");
    }

    return (
       <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Image
                    source={require('../../../../assets/getstarted.png')}
                    style={styles.image}
                />
                <Text style={styles.title}>Quick allergen detection</Text>
                <Text style={styles.subtitle}>Simply select the allergens you want to test for and then scan any food product to see if it contains any of them.</Text>

                <BlackButton
                    title={"Get started"}
                    onClick={getStarted}
                />
            </View>
       </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: Theme.HORIZONTAL_PADDING,
        justifyContent: "flex-end",
        paddingBottom: 40,
    },
    title: {
        fontSize: 24,
        fontFamily: "Rubik_600SemiBold",
        textAlign: "center",
        marginBottom: 20,
    },
    subtitle: {
        color: "#3F3F3F",
        fontFamily: "Rubik_400Regular",
        fontSize: 16,
        textAlign: "center",
        marginBottom: 70,
    },
    image: {
        width: "100%",
        height: 300,
        resizeMode: "contain",
        marginBottom: 60,
    },
});

export default OnboardingScreen1;