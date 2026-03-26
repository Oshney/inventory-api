import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {

  const supabase = createClient(
    process.env.URL,
    process.env.KEY
  );

  const { data, error } = await supabase
    .from("stock")
    .select("*");

  if (error) {
    return res.status(500).json({ error });
  }

  return res.status(200).json(data);
}
