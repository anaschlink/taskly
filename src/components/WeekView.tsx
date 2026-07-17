import { useState } from "react";
import { todayISO, getWeekDays, expandTemplates } from "../lib/schedule";
import { useSchedule } from "../hooks/useSchedule";
import { useTasks } from "../hooks/useTasks";

export function WeekView() {
  const { schedules, loading } = useSchedule();
  const { tasks } = useTasks();
  const [selectedDay, setSelectedDay] = useState(todayISO());

  const weekDays = getWeekDays(todayISO());
  const occurrences = expandTemplates(schedules, selectedDay, selectedDay);
  const dayTasks = tasks.filter((t => t.scheduled_date === selectedDay))
  ;

  // 3. guard
  if (loading) return <p>Carregando...</p>;

  // 4. JSX
  return (
    <div className="grid grid-cols-7 gap-1">
    {weekDays.map((w) => (
        <button className={`text-center rounded-lg py-1.5 ${w === selectedDay ? "bg-accent text-white" : ""}`} key={w} onClick={() => setSelectedDay(w)}>{w}</button>
    ))}
    </div>
  )
}