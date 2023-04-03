import { collection, doc, query, where } from "firebase/firestore"
import { useCollection, useDocument } from "react-firebase-hooks/firestore"
import { useParams } from "react-router-dom"
import Error from "../components/Error"
import Loading from "../components/Loading"
import VoteButtons from "../components/VoteButtons"
import { db } from "../firebase/firebase"


function PostPage() {
    const { id } = useParams()
    const [post, loading, error] = useDocument(doc(db, "/posts", `${id}`), {
        snapshotListenOptions: { includeMetadataChanges: true },
    })

    const [answers, loadingAnswer, AnswerError] = useCollection(query(collection(db, 'answers'), where("postId", "==", id)), {
        snapshotListenOptions: { includeMetadataChanges: true },
    })

    if (loading) {
        return <Loading />
    }

    if (error) {
        return <Error />
    }

    return (
        <div className="w-3/4 lg:w-[700px] pt-10 mx-auto">
            <section className="flex px-10 py-6 shadow-xl bg-white dark:bg-slate-800 shadow-slate-100 dark:shadow-none rounded-md">
                <div className="flex flex-col items-center mr-6">
                    <VoteButtons 
                        postId={id!}
                        upVotesUsers={post?.data()?.upVotesUsers}
                        downVotesUsers={post?.data()?.downVotesUsers}
                    />
                </div>
                <div className="w-full">
                    <div className="flex justify-between items-start">
                        <h2 className="text-xl mb-3 font-semibold">{post?.data()?.title}</h2>
                        <img className="rounded-full w-6" width="6px" height="6px" src={post?.data()?.author.profileImg} alt="profile image" />
                    </div>
                    <p className="text-sm mb-5 leading-6 text-slate-500 dark:text-slate-50">{post?.data()?.desc}</p>
                    <hr />
                    <div className="pt-4">
                        {/* <div className="flex items-center text-xs">
                            <img className="w-7 mr-3 rounded-full" width="12px" height="12px" src={post?.data()?.author.profileImg} alt="profile image" />
                            <p className="font-medium text-slate-500">Posted by <span className="text-blue-600">{post?.data()?.author.name}</span></p>
                            <button className="bg-blue-700 text-white rounded-md py-2 px-3 ml-auto">Reply</button>
                        </div> */}
                        {answers?.docs.map(answer => JSON.stringify(answer.data()))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default PostPage