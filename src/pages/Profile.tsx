import { signOut } from "firebase/auth"
import { auth } from "../firebase/firebase"
import { useAuthState } from "react-firebase-hooks/auth"

export default function Profile() {
    const [user] = useAuthState(auth)
    
    function logOut() {
        signOut(auth)
    }

    return (
        <div className="w-3/4 lg:w-[700px] pt-10 mx-auto">
            <h1>
                {user?.displayName}
            </h1>
            <button onClick={logOut}>Logout</button>
        </div>
    )
}