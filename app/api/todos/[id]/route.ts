import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// CORS 헤더 설정 함수
function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, PATCH',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
}

// OPTIONS 요청 처리
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

// PATCH - 데이터 수정
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { completed } = await request.json();

  const res = await fetch(`${API_URL}/todos/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ completed }),
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to update todo" },
      { status: res.status, headers: corsHeaders() }
    );
  }
  return NextResponse.json(
    { message: "Todo updated successfully" },
    { headers: corsHeaders() }
  );
}

// DELETE - 데이터 삭제
export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const id = url.pathname.split("/").pop();

  if (!id) {
    return NextResponse.json(
      { error: "Missing todo ID" },
      { status: 400, headers: corsHeaders() }
    );
  }

  const res = await fetch(`${API_URL}/todos/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to delete todo" },
      { status: res.status, headers: corsHeaders() }
    );
  }

  return new Response(null, { 
    status: 204,
    headers: corsHeaders()
  });
}