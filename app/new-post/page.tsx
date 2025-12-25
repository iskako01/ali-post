import PostForm from "@/components/post-form";
import { createPost } from "@/actions/post";

export default function NewPostPage() {
  return (
    <>
      <h1>Create a new post</h1>
      <PostForm action={createPost} />
    </>
  );
}
