import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline"
import { DocumentData } from "firebase/firestore"
import { Link } from "react-router-dom"
import VoteButtons from "./VoteButtons"

interface Post {
    id: string,
    data: DocumentData
}

export function Post({ id, data }: Post) {
    const { title, desc, author, upVotesUsers, downVotesUsers } = data

    return (
        <section className="flex px-10 py-6 shadow-xl bg-white dark:bg-slate-800 shadow-slate-100 dark:shadow-none rounded-md">
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
                        <p className="font-medium text-slate-500">Posted by <span className="text-blue-600">{author.name}</span></p>
                        <Link className="ml-auto" to={`/post/${id}`} >
                            <ChatBubbleLeftIcon className="h-5 w-5 text-slate-500" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )

}