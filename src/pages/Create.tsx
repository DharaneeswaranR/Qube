import { useEffect, useState } from "react"
import { auth, db } from "../firebase/firebase"
import { addDoc, collection } from "firebase/firestore"
import { useNavigate } from "react-router-dom"
import checkProfanity from "../utils/checkProfanity"
import isUserBanned from "../utils/isUserBanned"

interface Post {
    title: string,
    desc: string
}

interface Event {
    target: {
        name: string,
        value: string
    }
}

export default function Create() {
    const [post, setPost] = useState<Post>({ title: "", desc: ""})
    const [isBanned, setIsBanned] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        async function setBanned() {
            setIsBanned(await isUserBanned())
        }

        setBanned()
    }, [])

    function handleChange(event: Event) {
        setPost(prevPost => {
            return {
                ...prevPost,
                [event.target.name]: event.target.value
            }
        })
    }

    async function createPost() {
        if (await checkProfanity(post.title) || await checkProfanity(post.desc)) {
            return setIsBanned(true)
        }
        
        await addDoc(collection(db, '/posts'), {
            title: post.title,
            desc: post.desc,
            uid: auth.currentUser?.uid,
            author: {
                name: auth.currentUser?.displayName,
                profileImg: auth.currentUser?.photoURL
            },
            upVotesUsers: [],
            downVotesUsers: [],
        })

        setPost({ title: "", desc: ""})
        navigate('/')
    }

    return (
        <div className="text-slate-600 dark:bg-slate-900 dark:text-white h-full">
            <div className="w-3/4 lg:w-[700px] pt-10 mx-auto">
                <h1 className="text-xl font-semibold mb-2">Create new post</h1>
                {isBanned ? 
                    <div className="mt-3 p-3 bg-red-500">
                        <p className="text-white">You have been banned from creating posts.</p>
                    </div>
                    :
                    <div className="flex flex-col shadow-xl shadow-slate-100 p-6">
                        <label htmlFor="title-input" className="mb-1">Title</label>
                        <input 
                            type="text" 
                            name="title" 
                            id="title-input" 
                            value={post.title}
                            onChange={handleChange}
                            className="w-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 rounded-md p-2" 
                            placeholder="title"
                        />
                        <label htmlFor="desc-input" className="mt-3 mb-1">Description</label>
                        <textarea 
                            name="desc" 
                            id="desc-input" 
                            value={post.desc}
                            onChange={handleChange}
                            className="w-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 rounded-md p-2" 
                            cols={30} 
                            rows={10}
                            placeholder="description (optional)"
                        >
                        </textarea>
                        <div className="flex justify-start mt-5">
                            <button 
                                className="bg-blue-500 disabled:bg-blue-300 transition text-white px-2 py-1 mr-3 w-fit rounded-md" 
                                disabled={!post.title}
                                onClick={createPost}
                            >
                                Post Answer
                            </button>
                            <button 
                                className=" bg-white-gray transition px-2 py-1 w-fit rounded-md"
                                onClick={() => setPost({ title: "", desc: ""})}
                            >
                                Clear
                            </button>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}