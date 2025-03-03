import { doc, getDoc, setDoc, increment } from "firebase/firestore";
import DBRefs from "../config/DBRefs";
import { auth, db } from "../config/firebase";

/**
 * Retrieves the user document from Firestore.
 */
export const getUserDoc = async () => {
    try {
        const user = auth.currentUser;
        const userDocRef = doc(db, DBRefs.users, user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
            return userDoc.data();
        } else {
            console.warn("[Firebase] User document not found.");
            return null;
        }
    } catch (error) {
        console.error("[Firebase] Error retrieving user document:", error);
        throw error;
    }
}

/**
 * Retrieves the user's allergens list from Firestore.
 */
export const getUserAllergens = async () => {
    try {
        const userData = await getUserDoc();

        if (userData && Array.isArray(userData.allergens)) {
            return userData.allergens;
        } else {
            console.warn("[Firebase] User has no allergens field or it is not an array.");
            return [];
        }
    } catch (error) {
        console.error("[Firebase] Error retrieving user allergens:", error);
        throw error;
    }
}

/**
 * Saves the user's allergens list to Firestore
 */
export const saveUserAllergens = async (allergens) => {
    try {
        const user = auth.currentUser;
        const userDocRef = doc(db, DBRefs.users, user.uid);
        await setDoc(userDocRef, { allergens }, { merge: true });
    } catch (error) {
        console.error("[Firebase] Error saving user allergens:", error);
        throw error;
    }
}

/**
 * Increments the user's daily request count in Firestore.
 */
export const incrementTodayRequestCount = async () => {
    try {
        const user = auth.currentUser;
        const today = new Date().toISOString().split('T')[0];
        const userUsageRef = doc(db, DBRefs.users, user.uid, DBRefs.openAI, today);

        await setDoc(
            userUsageRef,
            { requestCount: increment(1) },
            { merge: true }
        );
    } catch (error) {
        console.error("[Firebase] Error incrementing today's request count:", error);
        throw error;
    }
}