import { NextResponse } from "next/server";

interface Feedback {
  name: string;
  email: string;
  message: string;
}

export async function POST(req: Request) {
  const data: Feedback = await req.json();
  const { email, message, name } = data;
  console.log(`data: ${data}`);

  return NextResponse.json(data);
}
