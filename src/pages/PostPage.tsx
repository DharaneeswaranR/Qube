import { addDoc, collection, doc, query, where } from "firebase/firestore"
import { useCollection, useDocument } from "react-firebase-hooks/firestore"
import { useParams } from "react-router-dom"
import Answer from "../components/Answer"
import Error from "../components/Error"
import Loading from "../components/Loading"
import VoteButtons from "../components/VoteButtons"
import { db, auth } from "../firebase/firebase"
import { useEffect, useState } from "react"
import checkProfanity from "../utils/checkProfanity"
import isUserBanned from "../utils/isUserBanned"

function PostPage() {
    const { id } = useParams()
    const [answer, setAnswer] = useState("")
    const [isBanned, setIsBanned] = useState(false)
    const [post, loading, error] = useDocument(doc(db, "/posts", `${id}`), {
        snapshotListenOptions: { includeMetadataChanges: true },
    })

    const [answers] = useCollection(query(collection(db, 'answers'), where("postId", "==", id)), {
        snapshotListenOptions: { includeMetadataChanges: true },
    })

    useEffect(() => {
        async function setBanned() {
            setIsBanned(await isUserBanned())
        }

        setBanned()
    }, [])

    async function postAnswer() {
        if (await checkProfanity(answer)) {
            return setIsBanned(true)
        }

        await addDoc(collection(db, 'answers'), {
            text: answer,
            postId: id,
            uid: auth.currentUser?.uid,
            author: {
                name: auth.currentUser?.displayName,
                profileImg: auth.currentUser?.photoURL
            },
            upVotesUsers: [],
            downVotesUsers: []
        })

        setAnswer("")
    }

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
                        id={id!}
                        collection="posts"
                        upVotesUsers={post?.data()?.upVotesUsers}
                        downVotesUsers={post?.data()?.downVotesUsers}
                    />
                </div>
                <div className="w-full">
                    <div className="flex justify-between items-start">
                        <h2 className="text-xl mb-3 font-semibold">{post?.data()?.title}</h2>
                        <img className="rounded-full w-6" width="6px" height="6px" src={post?.data()?.author.profileImg} alt="profile image" />
                    </div>
                    <p className="mb-5 leading-6 text-slate-500 dark:text-slate-50">{post?.data()?.desc}</p>
                    <hr />
                    {isBanned ? 
                        <div className="mt-3 p-3 bg-red-500">
                            <p className="text-white">You have been banned from creating posts.</p>
                        </div>
                        :
                        <div className="mt-3">
                            <textarea
                                value={answer}
                                onChange={(event) => setAnswer(event.target.value)}
                                className="w-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white-gray rounded-md p-2" 
                                placeholder="Answer"
                            />
                            <button 
                                className="bg-blue-500 disabled:bg-blue-300 transition text-white px-2 py-1 mt-2 rounded-md" 
                                disabled={!answer}
                                onClick={postAnswer}
                            >
                                Post Answer
                            </button>
                       </div>
                    }
                    <div className="pt-4 flex flex-col gap-3">
                        {answers?.docs.map(answer => <Answer key={answer.id} id={answer.id} data={answer.data()} />)}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default PostPage