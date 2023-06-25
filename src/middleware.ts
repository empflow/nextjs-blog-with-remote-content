import { NextRequest, NextResponse } from "next/server";
import getAllowedOrigins from "../util/getAllowedOrigins";

const allowedOrigins = getAllowedOrigins();

export function middleware(req: NextRequest) {
  console.log(allowedOrigins);
  const origin = req.headers.get("origin");
  console.log(origin);
  if (origin && !allowedOrigins.includes(origin)) {
    const message = "Origin not allowed";
    return NextResponse.json(
      { message },
      {
        status: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
  return NextResponse.next();
}
