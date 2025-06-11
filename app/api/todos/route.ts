import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("http://localhost:3000/todos");

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch todos" },
      { status: res.status }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
