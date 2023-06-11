import { Post } from "./Post"
import { QuerySnapshot } from "firebase/firestore"
import { PostSkeleton } from "./PostSkeleton"

interface PostsProps {
    posts: QuerySnapshot,
    isLoading: boolean
}

export function PostsList({ posts, isLoading }: PostsProps) {
    return (
        <div className="flex flex-col mt-10 gap-5">
            {isLoading ? (
                <>
                    <PostSkeleton />
                    <PostSkeleton />
                    <PostSkeleton />
                </>
            ) : (
                posts?.docs.map(post => {
                    return (
                        <Post
                            key={post.id}
                            id={post.id}
                            data={post.data()}
                        />
                    )
                })
            )}
        </div>
    )
}