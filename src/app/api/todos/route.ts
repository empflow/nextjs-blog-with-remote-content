import { NextResponse } from "next/server";
import axios from "axios";
import getEnvVar from "../../../../util/getEnvVar";
import { limiter } from "../config/limiter";

const DATA_SOURCE_URL = "https://jsonplaceholder.typicode.com/todos";
const API_KEY = getEnvVar("API_KEY");

export async function GET(req: Request) {
  const origin = req.headers.get("origin");
  const remaniningTokens = await limiter.removeTokens(1);
  if (remaniningTokens < 0) {
    return NextResponse.json(
      { message: "rate limited" },
      {
        status: 429,
        headers: {
          "Access-Control-Allow-Origin": origin || "*",
        },
      }
    );
  }
  console.log(`remanining tokens: ${remaniningTokens}`);
  const res = await axios.get(DATA_SOURCE_URL);
  const todos: Todo[] = res.data;
  return NextResponse.json(todos, {
    headers: {
      "Access-Control-Allow-Origin": origin || "*",
    },
  });
}

export async function POST(req: Request) {
  const { userId, title } = await req.json();
  if (!userId || !title) {
    const msg = "Both 'userId' and 'title' must be provided";
    return NextResponse.json({ message: msg }, { status: 400 });
  }

  const payload = { userId, title, done: false };
  const data = (await axios.post(DATA_SOURCE_URL, payload)).data;
  console.log(data);
  return NextResponse.json(data, {});
}

export async function DELETE(req: Request) {
  const { id }: Partial<Todo> = await req.json();

  try {
    await axios.delete(`${DATA_SOURCE_URL}/${id}`);
    return NextResponse.json({
      message: `Deleted todo ${id}`,
    });
  } catch (err) {
    return NextResponse.json({ message: "There has been an error" });
  }
}

export async function PUT(req: Request) {
  const body: Todo = await req.json();
  const { userId, id, title, done } = body;

  if (!userId || !id || !title || typeof done !== "boolean") {
    const message = "'userId', 'id', 'title', 'done' must all be provided";
    return NextResponse.json({ message }, { status: 400 });
  }

  const payload = { userId, title, done };
  const res = (await axios.put(`${DATA_SOURCE_URL}/${id}`, payload)).data;
  const updatedTodo = res.data;
  return NextResponse.json(updatedTodo, { status: 200 });
}
