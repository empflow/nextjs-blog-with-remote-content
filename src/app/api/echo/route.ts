import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const searchParamsEntries = new URLSearchParams(req.url).entries();
  const searchParamsObj = Object.fromEntries(searchParamsEntries);
  return NextResponse.json(searchParamsObj);
}
