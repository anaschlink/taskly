import { useTasks } from "./hooks/useTasks";
import { CaptureBar } from "./components/CaptureBar";
import { Sidebar } from "./components/Sidebar";
import { TaskList } from "./components/TaskList";
import { parseInput } from "./lib/parse";
import type { Task } from "./types";
import { todayISO } from "./lib/dates";
import { ProgressRing } from "./components/ProgressRing";
import { useAuth } from "./hooks/useAuth";
import { Login } from "./components/Login";


export function App(){
    const session = useAuth()
    if (!session){
        return <Login />
    }

    return <Taskly />
}

function Taskly(){
    const { tasks, lists, addTask, toggleTask, removeTask, ensureList } = useTasks();

    const concluidas = tasks.filter((t) => t.completed_at).length;
    const progresso = tasks.length === 0 ? 0 : concluidas / tasks.length;


async function handleAdd(raw: string){
        const parsed = parseInput(raw);
        const list_id = parsed.listName ? await ensureList(parsed.listName) : null;

        addTask({
        title: parsed.title,
        list_id: list_id,
        due_date: parsed.due,
        important: parsed.important,
    });
    }

    return (
  <div className="flex h-screen bg-paper text-ink">
        <Sidebar lists={lists} />

        <main className="flex-1 overflow-y-auto p-8">
        <div className="mx-auto max-w-2xl">
            <h1 className="font-display text-3xl font-bold text-accent">Taskly</h1>
            <ProgressRing progress={progresso}/>
            <div className="mt-6">
            <CaptureBar onAdd={handleAdd} />
            </div>
            <div className="mt-6">
            <TaskList tasks={tasks} onToggle={toggleTask} onRemove={removeTask} />
            </div>
        </div>
        </main>
    </div>
    );
}
