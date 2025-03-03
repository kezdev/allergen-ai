import { signInAnonymously } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import DBRefs from "../config/DBRefs";
import {auth, db} from "../config/firebase";

/**
 * Handles the creation or validation of a user document in Firestore.
 */
export const handleUserDocument = async (user) => {
    try {
        const userDocRef = doc(db, DBRefs.users, user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
            console.log("[Firebase] User already exists in Firestore.");
        } else {
            console.log("[Firebase] Creating new user in Firestore.");
            await setDoc(userDocRef, {
                uid: user.uid,
                onboarded: false,
                allergens: [],
                createdAt: new Date(),
            });
        }
    } catch (error) {
        console.error("[Firebase] Error handling user document:", error);
    }
}

/**
 * Signs in a user anonymously and handles Firestore setup.
 */
export const signInAnon = async () => {
    try {
        const userCredential = await signInAnonymously(auth);
        const user = userCredential.user;
        console.log("[Firebase] User signed in anonymously:", user.uid);
        await handleUserDocument(user);
    } catch (error) {
        console.error("[Firebase] Error signing in anonymously:", error);
    }
}


/**
 * Completes the onboarding process for a user.
 */
export const completeOnboarding = async () => {
    try {
        const user = auth.currentUser;
        const userDocRef = doc(db, DBRefs.users, user.uid);
        await setDoc(userDocRef, { onboarded: true }, { merge: true });
    } catch (error) {
        console.error("[Firebase] Error completing onboarding:", error);
    }
}