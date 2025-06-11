import { NextResponse } from "next/server";

// GET - 데이터 조회
export async function GET() {
  const res = await fetch('http://localhost:3000/todos');
  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch todos" },
      { status: res.status }
    );
  }
  const data = await res.json();
  return NextResponse.json(data);
}

// POST - 데이터 생성
export async function POST(request: Request) {
  const { title } = await request.json();
  const res = await fetch("http://localhost:3000/todos", {
    method: "POST",
    body: JSON.stringify({ title, completed: false }),
  });
  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to create todo" },
      { status: res.status }
    );
  }
  const data = await res.json();
  return NextResponse.json(data);
}