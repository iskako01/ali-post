import { formatDate, imageLoader } from "@/utils/utils.client";
import LikeButton from "./like-button";
import Image from "next/image";
import { IPost } from "@/interfaces/post";

interface IProps {
  post: IPost;
  updatePost: () => void;
}

export default function Post({ post, updatePost }: IProps) {
  return (
    <article className="post">
      <div className="post-image">
        <Image
          src={post.image}
          loader={imageLoader}
          alt={post.title}
          width={200}
          height={120}
          quality={50}
        />
      </div>
      <div className="post-content">
        <header>
          <div>
            <h2>{post.title}</h2>
            <p>
              Shared by {post.userFirstName} on{" "}
              {post.createdAt && (
                <time dateTime={post.createdAt}>
                  {formatDate(post.createdAt)}
                </time>
              )}
            </p>
          </div>
          <div className={post?.isLiked ? "liked" : ""}>
            {/* TODO: Fix userId */}
            <LikeButton updatePost={updatePost} />
          </div>
        </header>
        <p>{post.content}</p>
      </div>
    </article>
  );
}
