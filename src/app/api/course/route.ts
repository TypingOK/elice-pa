export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const filter_conditions = searchParams.get("filter_conditions");

  const offset = searchParams.get("offset");
  const count = searchParams.get("count") as string;

  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_ELICE_BACKEND_URL
    }?filter_conditions=${filter_conditions}
    &sort_by=created_datetime.desc&offset=${offset}&count=${parseInt(count)}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const result = await res.json();

  return Response.json({ ...result });
}
