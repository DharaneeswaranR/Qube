import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

export default async function isUserBanned() {
    const docRef = await getDoc(doc(db, 'bannedUsers', auth.currentUser?.uid!))
    return docRef.exists()
}