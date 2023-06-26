import getPostsMeta from "@/helpers/getPostsMeta";
import ListItem from "./ListItem";

export default async function Posts() {
  const postsMeta = await getPostsMeta();
  if (!postsMeta)
    return (
      <p className="mt-10 text-center">No posts available at the moment.</p>
    );

  return (
    <section className="mt-6 mx-auto max-w-2xl">
      <h2 className="text-4xl font-bold dark:text-white/90">Blog</h2>
      <ul className="w-full list-none p-0">
        {postsMeta.map((post) => (
          <ListItem key={post.id} post={post} />
        ))}
      </ul>
    </section>
  );
}
