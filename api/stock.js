import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.URL,
  process.env.KEY
);

export default async function handler(req, res) {

  const { data, error } = await supabase
    .from("stock")
    .select("*");

  if (error) {
    res.status(500).json(error);
    return;
  }

  res.status(200).json(data);
}
