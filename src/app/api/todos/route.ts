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
