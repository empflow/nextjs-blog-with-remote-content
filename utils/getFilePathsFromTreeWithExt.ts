/**
 * @param filetree the github filetree
 * @param extension the file extension including the dot
 * @returns an array of file paths from the provided filetree
 */
export default function getFilePathsFromTreeWithExt(
  filetree: GithubFiletree,
  extension: string
) {
  return filetree.tree
    .map((file) => file.path)
    .filter((path) => path.endsWith(extension));
}
