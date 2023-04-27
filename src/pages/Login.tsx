import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase/firebase'

export default function Login() {
    const navigate = useNavigate()
    
    async function signIn() {
        const provider = new GoogleAuthProvider()
        try {
            await signInWithPopup(auth, provider)
            navigate("/")
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className='flex justify-center bg-indigo-100 h-screen text-slate-800'>
            <div className='hidden sm:flex items-center justify-center w-[55%] p-10'>
                {/* <img src={LoginImg} className="lg:max-w-md" alt="login page" /> */}
            </div>
            <div className='flex justify-center flex-col bg-white p-4 w-full md:p-10 lg:p-20 sm:w-[45%] sm:rounded-l-3xl'>
                <h1 className='font-bold text-4xl pb-3'>Welcome!</h1>
                <p className='pb-10 font-semibold'>Please login to continue.</p>           
                <button onClick={signIn} className='p-3 mt-10 mb-5 rounded-lg w-full bg-indigo-700 text-white text-lg font-semibold hover:bg-indigo-800 active:bg-indigo-500 duration-300'>
                    Sign in with Google
                </button>                
            </div>
        </div>
    )
}
