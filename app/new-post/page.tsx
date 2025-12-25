import PostForm from "@/components/post-form";
import { addPost } from "@/lib/actions";
import { redirect } from "next/navigation";

export default function NewPostPage() {
  async function createPost(prevState, formData: FormData) {
    "use server";
    console.log(formData);

    const post = {
      title: formData.get("title")?.toString() || "",
      image: formData.get("image"),
      content: formData.get("content")?.toString() || "",
      userId: 123,
    };

    await addPost(post);

    redirect("/feed");
  }

  return (
    <>
      <h1>Create a new post</h1>
      <PostForm action={createPost} />
    </>
  );
}
