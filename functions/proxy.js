export async function onRequest(context) {
  const { searchParams } = new URL(context.request.url);
  const email = searchParams.get('email');
  const base_url = context.env.APPS_SCRIPT_URL;
  const target_url = \\?email=\\;

  try {
    const response = await fetch(target_url);
    const data = await response.json();
    return new Response(JSON.stringify(data), {
      headers: { 
        "Content-Type": "application/json", 
        "Access-Control-Allow-Origin": "*" 
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), { status: 500 });
  }
}
