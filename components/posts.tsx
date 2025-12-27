"use client";

import { togglePostLikeStatus } from "@/actions/post";
import Post from "@/components/post";
import { IPost } from "@/interfaces/post";
import { useOptimistic, startTransition } from "react";

interface IProps {
  posts: IPost[];
}

export default function Posts({ posts }: IProps) {
  const [optimisticPosts, updateOptimisticPosts] = useOptimistic(
    posts,
    (prevPosts, updatedPostId) => {
      const updatedPostIndex = prevPosts.findIndex(
        (post) => post.id === updatedPostId
      );

      if (updatedPostIndex === -1) {
        return prevPosts;
      }

      const updatedPost = { ...prevPosts[updatedPostIndex] };

      updatedPost.likes += updatedPost.isLiked ? -1 : 1;
      updatedPost.isLiked = !updatedPost.isLiked;

      const newPosts = [...prevPosts];
      newPosts[updatedPostIndex] = updatedPost;

      return newPosts;
    }
  );

  async function updatePost(postId: number) {
    startTransition(() => {
      updateOptimisticPosts(postId);
    });

    await togglePostLikeStatus(postId, 2);
  }

  return (
    <ul className="posts">
      {optimisticPosts.map((post) => (
        <li key={post.id}>
          <Post post={post} updatePost={() => updatePost(post.id)} />
        </li>
      ))}
    </ul>
  );
}
