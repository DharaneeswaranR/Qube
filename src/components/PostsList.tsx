import { Post } from "./Post"
import { QuerySnapshot } from "firebase/firestore"

interface PostsProps {
    posts: QuerySnapshot
}

export function PostsList({ posts }: PostsProps) {
    return (
        <div className="flex flex-col mt-10 gap-5">
            {posts?.docs.map(post => {
                return (
                    <Post
                        key={post.id}
                        id={post.id}
                        data={post.data()}
                    />
                )
            })}
        </div>
    )
}