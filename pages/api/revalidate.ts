// https://<your-site.com>/api/revalidate?secret=<token>
// http://localhost:3000/api/revalidate?path=/&secret=DaveGrayTeachesCode

import getEnvVar from "@/utils/getEnvVar";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const revalidationToken = getEnvVar("REVALIDATION_TOKEN");
  if (req.query.secret !== revalidationToken) {
    return res.status(401).json({ message: "Invalid token" });
  }

  const path = req.query.path as string;

  await res.revalidate(path);

  return res.json({ revalidated: true });
}
