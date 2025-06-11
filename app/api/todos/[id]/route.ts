import { NextResponse } from "next/server";

// PATCH - 데이터 수정
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { completed } = await request.json();

  const res = await fetch(`http://localhost:3000/todos/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ completed }),
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to update todo" },
      { status: res.status }
    );
  }
  return NextResponse.json({ message: "Todo updated successfully" });
}

// DELETE - 데이터 삭제
export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const id = url.pathname.split("/").pop();

  if (!id) {
    return NextResponse.json({ error: "Missing todo ID" }, { status: 400 });
  }

  const res = await fetch(`http://localhost:3000/todos/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to delete todo" },
      { status: res.status }
    );
  }

  return new Response(null, { status: 204 });
}