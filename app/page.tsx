import { Suspense } from "react";

import Posts from "@/components/posts";
import AuthForm from "@/components/auth-form";
import { getPosts } from "@/lib/post";

export const metadata = {
  title: "Latest Posts",
  description: "Browse our latest posts",
};

async function LatestPosts() {
  const latestPosts = await getPosts(2);
  return <Posts posts={latestPosts} />;
}

export default async function Home() {
  return (
    <>
      <h1>Welcome back!</h1>
      <p>Here&apos;s what you might&apos;ve missed.</p>
      <AuthForm />;
      <section id="latest-posts">
        <Suspense fallback={<p>Loading recent posts...</p>}>
          <LatestPosts />
        </Suspense>
      </section>
    </>
  );
}
