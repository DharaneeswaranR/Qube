import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useState, useRef } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { auth } from '../firebase/firebase'

export default function Login() {
    const navigate = useNavigate()
    // const inputEl = useRef(null)
    // const [error, setError] = useState<boolean>(false)
    // const [formData, setFormData] = useState<FormData>(
    //     {
    //         email: "",
    //         password: ""
    //     }
    // )

    // function handleChange(event: { target: { name: any; value: any } }) {
    //     setFormData(prevFormData => {
    //         return {
    //             ...prevFormData,
    //             [event.target.name]: event.target.value
    //         }
    //     })
    // }

    // function handleSubmit(event: { preventDefault: () => void }) {
    //     if (inputEl.current.checkValidity()) {
    //         event.preventDefault()
    //         const { email, password } = formData

    //         try {
    //             signInWithEmailAndPassword(auth, email, password);
    //         } catch (e) {
    //             setError(true)
    //         }
    //     }
    // }

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
               
           
                    {/*
                    <label htmlFor="email" className='block py-2 text-lg'>Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className='input-field'
                        placeholder='email'
                        onChange={handleChange}
                        value={formData.email}
                        ref={inputEl}
                        required
                    />
                    <label htmlFor="password" className='block py-2 text-lg'>Password</label>
                    <input
                        type="password"
                        id="password"
                        name='password'
                        className='input-field'
                        placeholder='password'
                        onChange={handleChange}
                        value={formData.password}
                        minLength={8}
                        ref={inputEl}
                        required
                    />
                    <button onClick={handleSubmit} className='p-3 mt-10 mb-5 rounded-lg w-full bg-indigo-700 text-white text-lg font-semibold hover:bg-indigo-800 active:bg-indigo-500 duration-300'>
                        Login
                    </button> */}
                    <button onClick={signIn} className='p-3 mt-10 mb-5 rounded-lg w-full bg-indigo-700 text-white text-lg font-semibold hover:bg-indigo-800 active:bg-indigo-500 duration-300'>
                        Sign in with Google
                    </button>
                    {/* <p className='text-center'>Don't have an account yet?
                        <Link to="/register" className='text-indigo-700 font-semibold'> Sign Up</Link>
                    </p> */}
                
            </div>
        </div>
    )
}
