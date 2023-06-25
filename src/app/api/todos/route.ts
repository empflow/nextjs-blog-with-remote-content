import { NextResponse } from "next/server";
import axios from "axios";
import getEnvVar from "../../../../util/getEnvVar";

const DATA_SOURCE_URL = "https://jsonplaceholder.typicode.com/todos";
const API_KEY = getEnvVar("API_KEY");

export async function GET() {
  const res = await axios.get(DATA_SOURCE_URL);
  const todos: Todo[] = res.data;
  return NextResponse.json(todos);
}

export async function POST(req: Request) {
  const { userId, title } = await req.json();
  if (!userId || !title) {
    const msg = "Both 'userId' and 'title' must be provided";
    return NextResponse.json({ message: msg }, { status: 400 });
  }

  const payload = { userId, title, completed: false };
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
