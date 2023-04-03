import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../firebase/firebase"
import { Navigate, Outlet } from "react-router-dom"
import Error from "./Error"
import Loading from "./Loading"


export default function AuthRequired() {
    const [user, loading, error] = useAuthState(auth)

    if (loading) {
        return <Loading />
    }

    if (error) {
        return <Error />
    }

    if (!user) {
        return <Navigate to='/login' />
    }

    return <Outlet />
}