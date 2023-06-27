import ListItem from "@/app/components/ListItem";
import getPostsMeta from "@/helpers/getPostsMeta";
import { TEN_MIN_IN_SEC } from "@/helpers/global";
import isInDevMode from "@/utils/isInDevMode";

export const revalidate = isInDevMode() ? 5 : TEN_MIN_IN_SEC;

interface Context {
  params: {
    tag: string;
  };
}

export async function generateStaticParams() {
  const posts = await getPostsMeta();
  if (!posts) return [];
  const tagsSet = new Set(posts.map((post) => post.tags).flat());
  return Array.from(tagsSet).map((tag) => ({ tag }));
}

export function generateMetadata({ params: { tag } }: Context) {
  try {
    return { title: `Posts tagged with ${decodeURI(tag)}` };
  } catch (err) {
    return { title: `Posts tagged with ${tag}` };
  }
}

export default async function TagPostList({
  params: { tag: uriEncodedTag },
}: Context) {
  const uriDecodedTag = decodeURI(uriEncodedTag);
  const noPostsForTagMsgElems = (
    <h2 className="text-3xl mt-4 mb-0">
      No posts tagged with '{uriDecodedTag}'
    </h2>
  );
  const allPosts = await getPostsMeta();
  if (!allPosts) return noPostsForTagMsgElems;
  const postsWithCurrTag = allPosts.filter((post) =>
    post.tags.includes(uriDecodedTag)
  );

  if (!postsWithCurrTag.length) return noPostsForTagMsgElems;

  return (
    <>
      <h2 className="text-3xl mt-4 mb-0">
        Posts tagged with '{uriDecodedTag}'
      </h2>
      <section className="mt-6">
        <ul className="w-full list-none p-0">
          {postsWithCurrTag.map((post) => (
            <ListItem key={post.id} post={post} />
          ))}
        </ul>
      </section>
    </>
  );
}
