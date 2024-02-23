export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const filter_conditions = searchParams.get("filter_conditions");
  const offset = searchParams.get("offset");

  const res = await fetch(
    `https://api-rest.elice.io/org/academy/course/list/?filter_conditions=${filter_conditions}
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
