import { doc, getDoc } from "firebase/firestore";
import DBRefs from "../config/DBRefs";
import {db} from "../config/firebase";

/**
 * Retrieves the global allergens list from Firestore.
 */
export const getGlobalAllergens = async () => {
    try {
        const docRef = doc(db, DBRefs.globalAllergens);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
            console.log(docSnapshot.data().names);
            return docSnapshot.data().names;
        } else {
            console.warn("[Firebase] Global allergens document not found.");
            return null;
        }
    } catch (error) {
        console.error("[Firebase] Error retrieving global allergens document:", error);
        throw error;
    }
}

/**
 * Retrieves the global daily limit from Firestore.
 */
export const getGlobalDailyLimit = async () => { // TODO: Implement this
    try {
        const docRef = doc(db, DBRefs.globalDailyLimit);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
            console.log(docSnapshot.data().count);
            return docSnapshot.data().count;
        } else {
            console.warn("[Firebase] Global daily limit doc not found.");
            return null;
        }
    } catch (error) {
        console.error("[Firebase] Error retrieving daily limit document:", error);
        throw error;
    }
}