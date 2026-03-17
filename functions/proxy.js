export async function onRequest(context) {
  const { searchParams } = new URL(context.request.url);
  const email = searchParams.get('email');
  const base_url = context.env.APPS_SCRIPT_URL;
  
  if (!base_url) {
    return new Response(JSON.stringify({ error: "APPS_SCRIPT_URL not set" }), { status: 500 });
  }

  const target_url = `${base_url}?email=${encodeURIComponent(email)}`;

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
