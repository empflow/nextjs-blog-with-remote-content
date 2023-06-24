import { NextResponse } from "next/server";
import axios from "axios";

const DATA_SOURCE_URL = "https://jsonplaceholder.typicode.com/todos";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const todoId = new URLSearchParams(url.searchParams).get("id");
  if (!todoId) return NextResponse.json({ message: "No todo ID provided" });

  try {
    const res = await axios.get(`${DATA_SOURCE_URL}/${todoId}`);
    return NextResponse.json(res.data);
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      ((err as any).message as string | undefined) ?? err
    );
  }
}
