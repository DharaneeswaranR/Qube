import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <header>
            <nav className="flex justify-between py-6 px-4 sm:px-6 lg:px-56 shadow-md dark:bg-slate-800 dark:shadow-none shadow-slate-100 relative">
                <Link to="/" className="text-lg">AskIt</Link>
                <Link to="/profile">Profile</Link>
            </nav>
        </header>   
    )
}