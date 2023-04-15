import { ChatBubbleLeftIcon, TrashIcon } from "@heroicons/react/24/outline"
import { DocumentData, deleteDoc, doc } from "firebase/firestore"
import { Link } from "react-router-dom"
import VoteButtons from "./VoteButtons"
import { auth, db } from "../firebase/firebase"

interface Post {
    id: string,
    data: DocumentData
}

export function Post({ id, data }: Post) {
    const { title, desc, uid, author, upVotesUsers, downVotesUsers } = data
    const user = auth.currentUser

    async function deletePost() {
        await deleteDoc(doc(db, 'posts', id))
    }

    return (
        <section className="flex px-10 py-6 shadow-lg bg-white dark:bg-slate-800 shadow-slate-100 dark:shadow-none rounded-md">
            <div className="flex flex-col items-center mr-6">
                <VoteButtons 
                    id={id}
                    collection='posts'
                    upVotesUsers={upVotesUsers}
                    downVotesUsers={downVotesUsers}
                />
            </div>
            <div className="w-full">
                <Link to={`/post/${id}`} >
                    <h2 className="text-xl mb-3 font-semibold">{title}</h2>
                </Link>
                <p className="mb-5 leading-6 text-slate-500 dark:text-slate-50">{desc.length > 300 ? desc.substring(0, 300) + "......" : desc}</p>
                <hr />
                <div className="pt-4">
                    <div className="flex items-center text-xs">
                        <img className="w-7 mr-3 rounded-full" width="12px" height="12px" src={author.profileImg} alt="profile image" />
                        <p className="font-medium mr-auto text-slate-500">Posted by <span className="text-blue-600">{user?.uid === uid ? "You" : author.name}</span></p>
                        {user?.uid === uid &&
                            <button className="mr-2" onClick={deletePost}>
                                <TrashIcon className="h-5 text-slate-500" />
                            </button>
                        } 
                        <Link to={`/post/${id}`} >
                            <ChatBubbleLeftIcon className="h-5 w-5 text-slate-500" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )

}