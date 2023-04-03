import { signOut } from "firebase/auth"
import { auth } from "../firebase/firebase"

export default function Profile() {
    const user = auth.currentUser

    function logOut() {
        signOut(auth)
    }

    return (
        <div>
            <h1>
                {user?.displayName}
            </h1>
            <button onClick={logOut}>Logout</button>
        </div>
    )
}