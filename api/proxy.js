export default async function handler(req, res) {
  const { email } = req.query;
  const API_URL = process.env.APPS_SCRIPT_URL;

  try {
    const url = new URL(API_URL);
    if (email) url.searchParams.set('email', email);
    
    const response = await fetch(url.toString());
    const data = await response.json();
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
