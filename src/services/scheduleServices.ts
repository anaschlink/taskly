import { supabase } from "../lib/supabase";
import type { NewScheduleTemplate, ScheduleTemplate } from "../lib/schedule";

export async function fetchSchedule(): Promise<ScheduleTemplate[]> {
  const { data, error } = await supabase.from("schedule_templates").select("*");
  if (error) { console.error("Erro ao buscar schedules:", error); return []; }
  return data;
}

export async function insertSchedule(template: NewScheduleTemplate): Promise<ScheduleTemplate | null> {
  const { data, error } = await supabase
    .from("schedule_templates")
    .insert(template)
    .select()
    .single();
  if (error) { console.error("Erro ao criar schedules:", error); return null; }
  return data;
}

export async function deleteSchedule(id: string): Promise<void>{
  const {error} = await supabase.from("schedule_templates").delete().eq("id",id); if (error) console.error("Erro ao deletar schedule:", error);

}


export async function updateSchedule(id: string, changes: Partial<ScheduleTemplate>): Promise<void> {
  const { error } = await supabase.from("schedule_templates").update(changes).eq("id", id);
  if (error) console.error("Erro ao atualizar Schedule:", error);
}