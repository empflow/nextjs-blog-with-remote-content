import getFormattedDate from "@/utils/getFormattedDate";
import getPostsMeta from "@/helpers/getPostsMeta";
import getPostByFilePath from "@/helpers/getPostByFilePath";
import { notFound } from "next/navigation";
import Link from "next/link";
import "highlight.js/styles/github-dark.css";

export const revalidate = 0;

interface Context {
  params: {
    postId: string;
  };
}
// export async function generateStaticParams() {
//   const posts = await getPostsMeta();
//   if (!posts) return [];
//   return posts.map((post) => ({
//     postId: post.id,
//   }));
// }

export async function generateMetadata({ params: { postId } }: Context) {
  const post = await getPostByFilePath(`${postId}.mdx`);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.meta.title,
  };
}

export default async function Post({ params: { postId } }: Context) {
  const post = await getPostByFilePath(`${postId}.mdx`);
  if (!post) notFound();

  const { content, meta } = post;
  const publishDate = getFormattedDate(meta.date);

  const postTagsElems = meta.tags.map((tag, i) => (
    <Link key={i} href={`/tags/${tag}`}>
      {tag}
    </Link>
  ));

  return (
    <>
      <h2 className="text-3xl mt-4 mb-0">{meta.title}</h2>
      <p className="mt-0 text-sm">{publishDate}</p>
      <article>{content}</article>
      <section>
        <h3>Related:</h3>
        <div className="flex flex-grow gap-4">{meta.tags}</div>
      </section>
      <p className="mb-10">
        <Link href="/">← Back to home</Link>
      </p>
    </>
  );
}
