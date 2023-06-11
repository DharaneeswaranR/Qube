import { signOut } from "firebase/auth"
import { auth } from "../firebase/firebase"
import { useAuthState } from "react-firebase-hooks/auth"

export default function Profile() {
    const [user] = useAuthState(auth)

    return (
        <div className="w-3/4 lg:w-[700px] pt-10 mx-auto h-3/4">
            <div className="flex flex-col items-center mt-36 text-slate-700">
                <img 
                    src={user?.photoURL!} 
                    alt="profile pic" 
                    className="w-36 h-36 rounded-full border-blue-600 border-4" 
                />
                <p className="font-bold mt-2">{user?.displayName}</p>
                <p className="text-sm">{user?.email}</p>
                <button
                    onClick={() => signOut(auth)}
                    className="bg-red-500 text-white px-3 py-1 rounded-full mt-4"
                >
                    Logout
                </button>
            </div>
        </div>
    )
}