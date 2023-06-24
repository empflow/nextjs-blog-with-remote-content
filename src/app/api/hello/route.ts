import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const serachParams = new URLSearchParams(req.url);
  const searchParamsObj = Object.fromEntries(serachParams.entries());
  console.log(serachParams.entries());
  return NextResponse.json({
    message: "hello this is a json response",
  });
}
