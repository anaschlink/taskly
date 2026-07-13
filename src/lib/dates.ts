export function todayISO(): string {
    const d = new Date;
    return d.toISOString().slice(0,10);
}
export function addDays(iso: string, n: number): string {
    const d = new Date(iso + "T00:00:00");
    d.setDate(d.getDate() + n);
    return d.toISOString().slice(0,10);
}
export function nextWeekday(target: number): string {
  const hoje = new Date().getDay();
  let diff = (target - hoje + 7) % 7;
  if (diff === 0) diff = 7;
  return addDays(todayISO(), diff);
}

export const names: Record<string, number> = {
  "hoje": 0,
  "amanhã": 1,
};

export const weekdays: Record<string, number> = {
  "dom": 0, "domingo": 0, 
  "segunda":1, "seg": 1, 
  "terca": 2, "terça": 2, "ter": 2,
  "qua": 3,"quarta": 3,
  "qui": 4,"quinta": 4,
  "sex": 5, "sexta": 5,
  "sab": 6,"sábado": 6, "sabado": 6
};

 
export function dateLabel(iso: string): string {
  const hoje = todayISO();
  if (iso === hoje) return "hoje";
  if (iso === addDays(hoje, 1)) return "amanhã";
  if (iso < hoje) return "atrasada";
  return iso.slice(8,10) + "/" + iso.slice(5,7);

}