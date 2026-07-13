import type { Task } from "../types";
import { TaskRow } from "./TaskRow";

interface TaskListProps{
    tasks: Task[];
    onToggle: (id: string) => void;
    onRemove: (id: string) => void;
}

export function TaskList({tasks, onToggle, onRemove}: TaskListProps){
    return(
        <div>
            {tasks.map((t) =>(
                <TaskRow key={t.id} task={t} onToggle={onToggle} onRemove={onRemove} />
            ))}
        </div>
    );
}