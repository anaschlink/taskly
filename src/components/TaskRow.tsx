import type { Task } from "../types"
import { dateLabel } from "../lib/dates";

interface TaskRowProps{
    task: Task;
    onToggle: (id:string) => void;
    onRemove: (id: string) => void;
}

export function TaskRow ({task, onToggle, onRemove}: TaskRowProps){
    return(
        <div
        className="group flex items-center gap-3 border-b border-neutral-100 py-3">
            <button onClick={() => onToggle(task.id)}
            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 text-xs text-white ${
        task.completed_at ? "border-accent bg-accent" : "border-neutral-300"
            }`}>
                {task.completed_at ? "✓" : ""}
            </button>
            <span className={`flex-1 ${task.completed_at ? "text-neutral-400 line-through" : "text-ink"}`}>{task.title}</span>

            {task.important && <span className="text-amber-500">★</span>}
            {task.due_date && <span className="font-mono text-xs text-neutral-500">{dateLabel(task.due_date)}</span>}
            <button onClick={() => onRemove(task.id)}
            className="text-neutral-300 opacity-0 transition group-hover:opacity-100 hover:text-red-500"
            >×</button>

        </div>
    )
}