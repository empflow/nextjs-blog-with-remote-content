import { NextResponse } from "next/server";
import axios from "axios";

const DATA_SOURCE_URL = "https://jsonplaceholder.typicode.com/todos";

export async function GET() {
  const res = await axios.get(DATA_SOURCE_URL);
  const todos: Todo[] = res.data;
  return NextResponse.json(todos);
}
