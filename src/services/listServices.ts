import { supabase } from "../lib/supabase";
import type { List } from "../types";

export async function fetchLists(): Promise<List[]> {
  const { data, error } = await supabase.from("lists").select("*");
  if (error) { console.error("Erro ao buscar lists:", error); return []; }
  return data;
}

export async function insertList(title: string): Promise<List | null> {
  const { data, error } = await supabase
    .from("lists")
    .insert({ title, color: "#5546FF" })
    .select()
    .single();
  if (error) { console.error("Erro ao criar list:", error); return null; }
  return data;
}