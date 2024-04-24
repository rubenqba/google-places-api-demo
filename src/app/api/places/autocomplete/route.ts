import env from "@config/env";
export const dynamic = "force-dynamic"; // defaults to auto

export async function POST(req: Request) {
  const body = await req.json();
  console.log("request: ", JSON.stringify(body, null, 2));

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": env.GOOGLE_PLACES_API_KEY
    },
    body: JSON.stringify(body),
  };

  const response = await fetch(
    "https://places.googleapis.com/v1/places:autocomplete",
    options
  );
  const data = await response.json();
  console.log("response: ", JSON.stringify(data, null, 2));
  return Response.json(data);
}
