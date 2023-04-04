import { arrayRemove, arrayUnion, collection, doc, updateDoc } from "firebase/firestore"
import { auth, db } from "../firebase/firebase"
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid"
import { useEffect, useState } from "react"

type Vote = 'upvote' | 'downvote'

interface VoteProps {
    id: string,
    collection: "posts" | "answers"
    upVotesUsers: string[]
    downVotesUsers: string[]
}

export default function VoteButtons(props: VoteProps) {
    const [hasUserUpvoted, setUserUpvoted] = useState(false)
    const [hasUserDownvoted, setUserDownvoted] = useState(false)
    const [voteCount, setVoteCount] = useState(0)

    useEffect(() => {
        const votesCount = props.upVotesUsers.length + (props.downVotesUsers.length * -1)
        setUserUpvoted(props.upVotesUsers.includes(auth.currentUser?.uid!))
        setUserDownvoted(props.downVotesUsers.includes(auth.currentUser?.uid!))
        setVoteCount(votesCount)
    }, [props.upVotesUsers, props.downVotesUsers])

    async function handleClick(type: Vote) {
        const userId = auth.currentUser?.uid
        const postRef = doc(db, props.collection, props.id)

        if (type === 'upvote') {
            await updateDoc(postRef, {
                upVotesUsers: hasUserUpvoted ? arrayRemove(userId) : arrayUnion(userId)
            })
        } else {
            await updateDoc(postRef, {
                downVotesUsers: hasUserDownvoted ? arrayRemove(userId) : arrayUnion(userId)
            })
        }
    }

    return (
        <div className="flex flex-col items-center">
            <button onClick={() => handleClick('upvote')} disabled={hasUserDownvoted}>
                <ArrowUpIcon className={`h-6 w-6 ${hasUserUpvoted ? 'text-red-500': 'text-slate-400'}`}/>
            </button>
            <p className={` font-medium ${hasUserUpvoted || hasUserDownvoted ? (hasUserUpvoted ? 'text-red-500': 'text-blue-500'): 'text-slate-400'}`}>
                {voteCount}
            </p>
            <button onClick={() => handleClick('downvote')} disabled={hasUserUpvoted}>
                <ArrowDownIcon className={`h-6 w-6 ${hasUserDownvoted ? 'text-blue-500': 'text-slate-400'}`}/>
            </button>
        </div>
    )
}