import { collection } from "firebase/firestore"
import { useCollection } from "react-firebase-hooks/firestore"
import { PostsList } from "../components/PostsList"
import { db } from "../firebase/firebase"
import { Link } from "react-router-dom"
import { PencilSquareIcon } from "@heroicons/react/24/outline"

export default function Home() {
    const [posts, loading] = useCollection(collection(db, 'posts'), {
        snapshotListenOptions: { includeMetadataChanges: true },
    })
    
    return (
        <div className="text-slate-600 dark:bg-slate-900 dark:text-white">
            <div className="w-3/4 lg:w-[700px] pt-10 mx-auto">
                <Link
                    to="/create"
                    className="flex items-center bg-slate-50 w-fit hover:bg-slate-100 transition-all duration-500 rounded-full px-4 py-2"
                >
                    <PencilSquareIcon className="h-5 w-5 mr-2" />
                    Create
                </Link>
                <PostsList posts={posts!} isLoading={loading} />
            </div>
        </div>
    )
}
