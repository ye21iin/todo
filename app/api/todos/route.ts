import { NextResponse } from "next/server";
import { headers } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

console.log('API_URL:', process.env.NEXT_PUBLIC_API_URL);

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

// GET - 데이터 조회
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const completedFilter = searchParams.get('completed');

  let url = `${API_URL}/todos`;
  if (completedFilter !== null) { 
    url += `?completed=${completedFilter}`;
  }

  try {
    const res = await fetch(url);
    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch todos" },
        { status: res.status, headers: corsHeaders() }
      );
    }
    const data = await res.json();
    return NextResponse.json(data, { headers: corsHeaders() });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: "Failed to fetch todos" },
      { status: 500, headers: corsHeaders() }
    );
  }
}

// POST - 데이터 생성
export async function POST(request: Request) {
  const { title } = await request.json();
  const res = await fetch(`${API_URL}/todos`, {
    method: "POST",
    body: JSON.stringify({ title, completed: false }),
  });
  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to create todo" },
      { status: res.status, headers: corsHeaders() }
    );
  }
  const data = await res.json();
  return NextResponse.json(data, { headers: corsHeaders() });
}