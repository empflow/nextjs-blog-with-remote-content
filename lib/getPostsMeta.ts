import getPostByFilePath from "./getPostByFilePath";

export default async function getPostsMeta(): Promise<PostMeta[] | null> {
  const filetree: GithubFiletree = await (await getResFromGithubApi()).json();
  const postsFilePaths = getFilePathsFromTreeWithExt(filetree, ".mdx");

  const posts: PostMeta[] = [];
  for (const postFilePath of postsFilePaths) {
    const post = await getPostByFilePath(postFilePath);
    if (post) posts.push(post.meta);
  }

  console.log(posts);
  return posts;
}

/**
 * @param filetree the github filetree
 * @param extension the file extension including the dot
 * @returns an array of file paths from the provided filetree
 */
function getFilePathsFromTreeWithExt(
  filetree: GithubFiletree,
  extension: string
) {
  return filetree.tree
    .map((file) => file.path)
    .filter((path) => path.endsWith(extension));
}

function getResFromGithubApi() {
  return fetch(
    `https://api.github.com/repos/empflow/nextjs-blog-content/git/trees/main?recursive=1`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );
}
