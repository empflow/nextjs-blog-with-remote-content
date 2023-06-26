import { compileMDX, CompileMDXResult } from "next-mdx-remote/rsc";

export default async function getPostByFilePath(
  filePath: string
): Promise<Post | null> {
  const res = await getResFromGithubApi(filePath);
  if (!isGithubResValid(res)) return null;
  const rawMdx = await res.text();

  const compiledMdx = await compileMDX<PostFrontmatter>({
    source: rawMdx,
  });
  return constructPostObj(compiledMdx, filePath);
}

async function getResFromGithubApi(filePath: string) {
  return fetch(
    `https://raw.githubusercontent.com/empflow/nextjs-blog-content/main/${filePath}`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );
}

async function isGithubResValid(res: Response) {
  const data = await res.text();
  if (!res.ok || data === "404: Not Found") return false;
  return true;
}

function constructPostObj(
  compiledMdx: CompileMDXResult<PostFrontmatter>,
  filePath: string
): Post {
  const { content, frontmatter } = compiledMdx;
  const { date, tags, title } = frontmatter;
  const postId = filePath.replace(/\.mdx$/, "");
  const postObj: Post = { content, meta: { date, id: postId, tags, title } };
  return postObj;
}
