import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  console.log("Hello middleware");
  console.log(req.ip);
  console.log(req.method);
  console.log(req.url);
  const origin = req.headers.get("origin");
  if (origin) console.log(origin);

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path+",
};
