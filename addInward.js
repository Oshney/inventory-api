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

    // 🔥 👉 YAHAN APNI SUPABASE ANON KEY DALNI HAI
    const SUPABASE_KEY = "PASTE_YOUR_SUPABASE_ANON_KEY_HERE";

    const response = await fetch(
      "https://locrzxuubbbiwtoefyht.supabase.co/rest/v1/inwards",
      {
        method: "POST",
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          "Content-Type": "application/json",
          Prefer: "return=representation"
        },
        body: JSON.stringify([
          { sno, shop_name, name, item, qty, order_date, note }
        ])
      }
    );

    const text = await response.text();   // 🔥 debug
    console.log("Supabase Response:", text);

    const data = JSON.parse(text);

    res.status(200).json({
      message: "Inward added successfully",
      data
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
