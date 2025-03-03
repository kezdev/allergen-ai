import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import {NavigationContainer} from "@react-navigation/native";
import OnboardingScreen1 from "./screens/onboarding/OnboardingScreen1";
import OnboardingScreen2 from "./screens/onboarding/OnboardingScreen2";

const OnboardingNavigator = () => {

    const OnboardingStack = createStackNavigator();

    return (
        <NavigationContainer>
            <OnboardingStack.Navigator screenOptions={{ headerShown: false }} id={1}>
                <OnboardingStack.Screen name="OnboardingScreen1" component={OnboardingScreen1} />
                <OnboardingStack.Screen name="OnboardingScreen2" component={OnboardingScreen2} />
            </OnboardingStack.Navigator>
        </NavigationContainer>
    );
}

export default OnboardingNavigator;