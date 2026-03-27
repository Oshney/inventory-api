export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const { item, qty } = req.body;

  const response = await fetch(
    "https://locrzxuubbbiwtoefyht.supabase.co/rest/v1/stock",
    {
      method: "POST",
      headers: {
        apikey: process.env.KEY,
        Authorization: `Bearer ${process.env.KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify([{ item, qty }])
    }
  );

  const data = await response.json();

  res.status(200).json(data);
}
