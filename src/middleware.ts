import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const regex = new RegExp("/api/*");
  if (regex.test(req.url)) {
    console.log("matches");
  }
  console.log(req.method);
  console.log(req.url);
  const origin = req.headers.get("origin");
  if (origin) console.log(origin);

  return NextResponse.next();
}
