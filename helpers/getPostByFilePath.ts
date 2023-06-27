import deepCopy from "@/utils/deepCopy";
import { compileMDX, CompileMDXResult } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import Video from "@/app/components/Video";
import CustomImage from "@/app/components/CustomImage";
import getEnvVar from "@/utils/getEnvVar";

export default async function getPostByFilePath(
  filePath: string
): Promise<Post | null> {
  const res = await getResFromGithubApi(filePath);
  if (!isGithubResValid(res)) return null;
  const rawMdx = await res.text();

  try {
    const compiledMdx = await compileMDX<PostFrontmatter>({
      source: rawMdx,
      components: {
        Video,
        CustomImage,
      },
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          rehypePlugins: [
            rehypeHighlight,
            rehypeSlug,
            [rehypeAutolinkHeadings, { behavior: "wrap" }],
          ],
        },
      },
    });
    return constructPostObj(compiledMdx, filePath);
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function getResFromGithubApi(filePath: string) {
  const githubToken = getEnvVar("GITHUB_TOKEN");
  return fetch(
    `https://raw.githubusercontent.com/empflow/nextjs-blog-content/main/${filePath}`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${githubToken}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );
}

async function isGithubResValid(res: Response) {
  const resCopy = deepCopy(res);
  if (!resCopy.ok) return false;
  if ((await res.text()) === "404: Not Found") return false;
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
