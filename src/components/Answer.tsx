import VoteButtons from "./VoteButtons"

interface Answer {
    id: string,
    data: any
}

export default function Answer({ id, data }: Answer) {
    const { text, author, upVotesUsers, downVotesUsers } = data
    
    return (
        <section className="flex flex-col px-6 py-4 bg-white-gray dark:bg-slate-800 rounded-md">
            <div className="flex items-center">
                <img className="w-6 mr-3 rounded-full" width="6px" height="6px" src={author.profileImg} alt="profile image" />
                <p className="text-md font-medium text-blue-600">{author.name}</p>
            </div>
            <div className="flex mt-2">
                <VoteButtons 
                    id={id}
                    collection="answers"
                    upVotesUsers={upVotesUsers}
                    downVotesUsers={downVotesUsers}
                />
                <div className="w-full ml-3">
                    <p className="leading-6 text-slate-500 dark:text-slate-50">{text}</p>
                </div>
            </div>
        </section>
    )
}