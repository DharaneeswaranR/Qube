import { Link } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Navbar() {
    const [user] = useAuthState(auth)

    return (
        <header>
            <nav className="flex justify-between py-5 px-3 sm:px-6 lg:px-56 shadow-md dark:bg-slate-800 dark:shadow-none shadow-slate-100 relative">
                <Link to="/" className="text-2xl font-extrabold text-blue-600">Qube</Link>
                <Link to="/profile"> 
                    <img className="w-8 rounded-full" width="12px" height="12px" src={user?.photoURL!} alt="profile image" />
                </Link>
            </nav>
        </header>   
    )
}