import { collection, addDoc, Timestamp } from "firebase/firestore"
import { useCollection } from "react-firebase-hooks/firestore"
import { Post } from "../components/Post"
import { PostsList } from "../components/PostsList"
import { db } from "../firebase/firebase"
import { Link } from "react-router-dom"
import Loading from "../components/Loading"
import Error from "../components/Error"
import { PencilSquareIcon } from "@heroicons/react/24/outline"

export default function Home() {
    const [posts, loading, error] = useCollection(collection(db, 'posts'), {
        snapshotListenOptions: { includeMetadataChanges: true },
    })

    if (loading) return <Loading />
    if (error) return <Error />
    
    return (
        <div className="text-slate-600 dark:bg-slate-900 dark:text-white h-full">
            <div className="w-3/4 lg:w-[700px] pt-10 mx-auto">
                <Link to='/create' className="flex items-center bg-slate-50 w-fit hover:bg-slate-100 transition-all duration-500 rounded-full px-4 py-2">
                    <PencilSquareIcon className="h-5 w-5 mr-2" />
                    Create
                </Link>
                {posts ? 
                    <PostsList posts={posts!} /> 
                    : 
                    <p className="text-center italic text-slate-500 mt-10">No posts. Click create button to create one</p>
                }
            </div>
        </div>
    )
}