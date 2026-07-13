import { supabase } from "../lib/supabase";
import type { List } from "../types";

export async function fetchLists(): Promise<List[]> {
  const { data, error } = await supabase.from("lists").select("*");
  if (error) { console.error("Erro ao buscar lists:", error); return []; }
  return data;
}

export async function insertList(title: string, color: string): Promise<List | null> {
  const { data, error } = await supabase
    .from("lists")
    .insert({ title, color })
    .select()
    .single();
  if (error) { console.error("Erro ao criar list:", error); return null; }
  return data;
}

export async function deleteList(id: string): Promise<void>{
  const {error} = await supabase.from("lists").delete().eq("id",id); if (error) console.error("Erro ao deletar list:", error);

}

export async function updateListColor(id: string, color: string): Promise<void> {
  const { error } = await supabase.from("lists").update({ color }).eq("id", id);
  if (error) console.error("Erro ao atualizar cor:", error);
}