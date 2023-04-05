import Filter from "bad-words";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

export default async function checkProfanity(text: string) {
    const filter = new Filter()
    const { uid } = auth.currentUser!

    if (filter.isProfane(text)) {
        await setDoc(doc(db, 'bannedUsers', uid), {})
        return true
    }

    return false
}