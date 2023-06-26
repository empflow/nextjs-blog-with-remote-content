interface PostMeta {
  id: string;
  title: string;
  date: string;
  tags: string[];
}

interface Post {
  meta: PostMeta;
  content: ReactElement<any, string | JSXElementConstructor<any>>;
}

interface PostFrontmatter {
  title: string;
  date: string;
  tags: string[];
}

interface GithubFiletree {
  tree: [
    {
      path: string;
    }
  ];
}
