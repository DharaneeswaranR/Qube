import { collection, addDoc, Timestamp } from "firebase/firestore"
import { useState } from "react"
import { useCollection } from "react-firebase-hooks/firestore"
import { Post } from "../components/Post"
import { PostsList } from "../components/PostsList"
import { auth, db } from "../firebase/firebase"

interface Post {
    title: string,
    desc: string,
}

export default function Home() {
    const [post, setPost] = useState<Post>({ title: "", desc: "" })
    const [postField, setPostField] = useState(false)

    const user = auth.currentUser
    const postRef = collection(db, 'posts')
    const [posts, loading, error] = useCollection(postRef, {
        snapshotListenOptions: { includeMetadataChanges: true },
    })


    function handleChange(event: { target: { name: any; value: any } }) {
        setPost(prevPost => {
            return {
                ...prevPost,
                [event.target.name]: event.target.value
            }
        })
    }

    async function addPost() {
        await addDoc(postRef, {
            title: post.title,
            desc: post.desc,
            uid: user?.uid,
            author: {
                name: user?.displayName,
                profileImg: user?.photoURL
            },
            upVotesUsers: [],
            downVotesUsers: [],
        })
    }

    return (
        <div className="text-slate-600 dark:bg-slate-900 dark:text-white h-full">
            <div className="w-3/4 lg:w-[700px] pt-10 mx-auto">
                {postField ? (
                    <div className="flex flex-col">
                        <div className="flex justify-between">
                            <h2 className="text-xl">Create new post</h2>
                            <button onClick={() => setPostField(false)}>Close</button>
                        </div>
                        <label htmlFor="title">Title</label>
                        <input type="text" name="title" value={post.title} onChange={handleChange} />
                        <label htmlFor="desc">Description</label>
                        <input type="text" name="desc" value={post.desc} onChange={handleChange} />
                        <div>
                            <button
                                className="p-2 w-full bg-blue-600 text-white mr-3 rounded-md outline-none"
                                onClick={addPost}>Create post
                            </button>
                        </div>
                    </div>
                ) : (
                    <button onClick={() => setPostField(true)}>Create Post</button>
                )}
                <PostsList posts={posts!} />
            </div>
        </div>
    )
}