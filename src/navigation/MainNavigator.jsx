import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import {NavigationContainer} from "@react-navigation/native";
import CameraScreen from "./screens/app/CameraScreen";
import SettingsScreen from "./screens/app/SettingsScreen";
import ResultsScreen from "./screens/app/ResultsScreen";

const MainNavigator = () => {
    const RootStack = createStackNavigator();

    return (
        <NavigationContainer>
            <RootStack.Navigator screenOptions={{ headerShown: false }} id={'1'}>
                <RootStack.Screen
                    name="CameraScreen"
                    component={CameraScreen}
                />
                <RootStack.Screen
                    name="ResultsScreen"
                    component={ResultsScreen}
                />
                <RootStack.Screen
                    name="SettingsScreen"
                    component={SettingsScreen}
                />
            </RootStack.Navigator>
        </NavigationContainer>
    );
}

export default MainNavigator;