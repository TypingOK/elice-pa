import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const filter_conditions = searchParams.get("filter_conditions");
  const encoded_conditions = encodeURIComponent(filter_conditions as string);
  const offset = searchParams.get("offset");
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ELICE_BACKEND_URL}?filter_conditions=${encoded_conditions}
    &sort_by=created_datetime.desc&offset=${offset}&count=20`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const result = await res.json();

  return Response.json({ ...result });
}
