import { supabase } from "../lib/supabase";
import type { Task } from "../types";

export async function fetchTasks(): Promise<Task[]>{
    const{ data, error} = await supabase
    .from("tasks")
    .select("*")
    .order("created_at", {ascending: false});

    if (error){
        console.error("Erro ao buscar tasks", error);
        return [];
    }

    return data
}

export async function insertTask(task: {
  title: string;
  list_id: string | null;
  due_date: string | null;
  important: boolean;
}): Promise<Task | null> {
  const { data, error } = await supabase
    .from("tasks")
    .insert(task)
    .select()
    .single();

  if (error) {
    console.error("Erro ao criar task:", error);
    return null;
  }
  return data;
}

export async function updateTask(id: string, changes: Partial<Task>): Promise<void> {
  const { error } = await supabase.from("tasks").update(changes).eq("id", id);
  if (error) console.error("Erro ao atualizar task:", error);
}

export async function deleteTask(id: string): Promise<void> {
  const { error } = await supabase.from("tasks").delete().eq("id", id);
  if (error) console.error("Erro ao deletar task:", error);
}