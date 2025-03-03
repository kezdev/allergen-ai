import React, { useEffect, useState } from "react";
import { signInAnon } from "./src/helpers/authHelper";
import LoadingScreen from "./src/navigation/screens/LoadingScreen";
import MainNavigator from "./src/navigation/MainNavigator";
import OnboardingNavigator from "./src/navigation/OnboardingNavigator";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, onSnapshot } from "firebase/firestore";
import DBRefs from "./src/config/DBRefs";
import {useFonts, Rubik_400Regular, Rubik_600SemiBold, Rubik_700Bold } from "@expo-google-fonts/rubik";

const App = () => {
  const [isReady, setIsReady] = useState(false);
  const [user, setUser] = useState(null);

  const [fontsLoaded] = useFonts({
    Rubik_400Regular,
    Rubik_600SemiBold,
    Rubik_700Bold
  });

  useEffect(() => {
    let unsubscribe;

    const initApp = async () => {
      try {
        await signInAnon();
        const auth = getAuth();
        const userId = auth.currentUser?.uid;

        if (userId) {
          const db = getFirestore();
          const userDocRef = doc(db, DBRefs.users, userId);

          unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
            if (docSnapshot.exists()) {
              setUser(docSnapshot.data());
              setIsReady(true);
            } else {
              console.error("User document not found.");
            }
          });
        } else {
          console.error("No authenticated user found.");
        }
      } catch (error) {
        console.error("Error initializing app:", error);
      }
    }

    initApp();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  if (!fontsLoaded || !isReady) {
    return <LoadingScreen />
  }

  if (user && !user.onboarded) {
    return <OnboardingNavigator />
  }

  return <MainNavigator />
};

export default App;