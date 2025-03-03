import React, { useEffect, useState, useRef } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { getUserAllergens } from "../../../helpers/userHelper";
import { CameraView, useCameraPermissions } from "expo-camera";
import { StatusBar } from "expo-status-bar";
import CameraButtonBox from "../../../components/camera/CameraButtonBox";
import CameraSettingsButton from "../../../components/camera/CameraSettingsButton";

const CameraScreen = ({ navigation }) => {
    const [myAllergens, setMyAllergens] = useState([]);
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef(null);

    const navigateToSettings = () => {
        navigation.navigate('SettingsScreen');
    }

    const takePicture = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();
            navigation.navigate('ResultsScreen', { photoUri: photo.uri, allergens: myAllergens });
        }
    }

    const _getUserAllergens = async () => {
        const result = await getUserAllergens();
        setMyAllergens(result);
    }

    useEffect(() => {
        _getUserAllergens();
    }, []);

    if (permission === null) {
        return <Text>Requesting permission...</Text>;
    }

    if (permission?.status !== 'granted') {
        return (
            <View style={styles.container}>
                <Text>Camera permission is required to use this feature.</Text>
                <Pressable onPress={() => requestPermission()}>
                    <Text>Request Permission</Text>
                </Pressable>
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <StatusBar style="dark" />
            <View style={styles.container}>
                <StatusBar style="dark" />
                <CameraView
                    facing="back" style={styles.fullCamera} ref={cameraRef}>
                    <CameraSettingsButton onPress={navigateToSettings} />
                    <CameraButtonBox onPress={takePicture} />
                </CameraView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fullCamera: {
        flex: 1,
        width: '100%',
    }
});

export default CameraScreen;
