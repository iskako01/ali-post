import { formatDate } from "@/utils/utils";
import LikeButton from "./like-button";
import Image from "next/image";

export default function Post({ post }) {
  return (
    <article className="post">
      <div className="post-image">
        <Image src={post.image} alt={post.title} width={200} height={200} />
      </div>
      <div className="post-content">
        <header>
          <div>
            <h2>{post.title}</h2>
            <p>
              Shared by {post.userFirstName} on{" "}
              <time dateTime={post.createdAt}>
                {formatDate(post.createdAt)}
              </time>
            </p>
          </div>
          <div className={post?.isLiked ? "liked" : ""}>
            {/* TODO: Fix userId */}
            <LikeButton postId={post.id} userId={2} />
          </div>
        </header>
        <p>{post.content}</p>
      </div>
    </article>
  );
}
