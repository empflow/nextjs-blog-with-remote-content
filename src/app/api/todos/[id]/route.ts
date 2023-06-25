import axios from "axios";
import { NextResponse } from "next/server";

const DATA_SOURCE_URL = "https://jsonplaceholder.typicode.com/todos";

interface Params {
  id: string;
}

export async function GET(req: Request, { params }: { params: Params }) {
  try {
    const res = await axios.get(`${DATA_SOURCE_URL}/${params.id}`);
    const todo = res.data;
    return NextResponse.json(todo);
  } catch (err) {
    return NextResponse.json(
      {
        message: (err as any).message ?? "There has been an error",
      },
      { status: (err as any).response.status ?? 500 }
    );
  }
}
