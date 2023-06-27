import getEnvVar from "./getEnvVar";

export default function isInDevMode() {
  const nodeEnv = getEnvVar("NODE_ENV");
  return nodeEnv === "development" ? true : false;
}
