import { useState } from "react";
import { todayISO, getWeekDays, expandTemplates } from "../lib/schedule";
import { useSchedule } from "../hooks/useSchedule";
import { useTasks } from "../hooks/useTasks";
import { TaskList } from "./TaskList";

export function WeekView() {
  const { schedules, loading } = useSchedule();
  const { tasks, toggleTask, removeTask } = useTasks();
  const [selectedDay, setSelectedDay] = useState(todayISO());

  const weekDays = getWeekDays(todayISO());
  const occurrences = expandTemplates(schedules, selectedDay, selectedDay);
  const dayTasks = tasks.filter((t => t.scheduled_date === selectedDay))
  ;

  // 3. guard
  if (loading) return <p>Carregando...</p>;

  // 4. JSX
  return (
    <div>
    <div className="grid grid-cols-7 gap-1">
    {weekDays.map((w) => (
      <button className={`text-center rounded-lg py-1.5 ${w === selectedDay ? "bg-accent text-white" : ""}`} key={w} onClick={() => setSelectedDay(w)}>{w}</button>
    ))}
    </div>

    <div className="mt-4">
    {occurrences.map((o) => (
       <div key={`${o.template_id}-${o.date}`} className="rounded-xl border border-neutral-200 p-3 mb-2">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full" style={{ backgroundColor: o.color }} />
          <span className="flex-1">{o.activity}</span>
          <span className="text-xs text-neutral-500">{o.start_time}–{o.end_time}</span>
        </div>
        <TaskList 
        tasks={dayTasks.filter((t) => t.schedule_template_id === o.template_id)}
        onToggle={toggleTask}
        onRemove={removeTask}/>
      </div>
    ))}
    </div>

    </div>

  )
}