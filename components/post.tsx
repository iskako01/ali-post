import { formatDate } from "@/lib/format";
import LikeButton from "./like-icon";
import Image from "next/image";

export default function Post({ post }) {
  return (
    <article className="post">
      <div className="post-image">
        <Image src={post.image} alt={post.title} />
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
          <div>
            <LikeButton />
          </div>
        </header>
        <p>{post.content}</p>
      </div>
    </article>
  );
}
