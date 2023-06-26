export default function getUriDecodedStr(uriEncodedStr: string) {
  try {
    // may throw URI malformed error if encounters forbidden characters
    return decodeURI(uriEncodedStr);
  } catch (err) {
    return uriEncodedStr;
  }
}
