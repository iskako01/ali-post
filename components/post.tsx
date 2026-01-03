import { formatDate } from "@/utils/utils.client";
import LikeButton from "./like-button";
import Image from "next/image";
import { IPost } from "@/interfaces/post";

interface IProps {
  post: IPost;
  updatePost: () => void;
}

function imageLoader(config) {
  if (!config.src) {
    return;
  }

  const splitedUrl = config.src.split("upload/");

  const urlStart = splitedUrl[0];
  const urlEnd = splitedUrl[1];

  const transformations = `w_200.h_150,q_`

  return config.src;
}

export default function Post({ post, updatePost }: IProps) {
  return (
    <article className="post">
      <div className="post-image">
        <Image src={post.image} loader={} alt={post.title} fill />
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
