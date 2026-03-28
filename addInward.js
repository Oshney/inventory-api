export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Only POST allowed" });
    }

    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const { sno, shop_name, name, item, qty, order_date, note } = body;

    if (!item || !qty) {
      return res.status(400).json({ error: "Missing fields", received: body });
    }

    const response = await fetch(
      "https://locrzxuubbbiwtoefyht.supabase.co/rest/v1/inwards",
      {
        method: "POST",
        headers: {
          apikey: process.env.KEY,
          Authorization: `Bearer ${process.env.KEY}`,
          "Content-Type": "application/json",
          Prefer: "return=representation"
        },
        body: JSON.stringify([{ sno, shop_name, name, item, qty, order_date, note }])
      }
    );

    const data = await response.json();
    res.status(200).json({ message: "Inward added", data });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
