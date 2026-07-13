import { useTasks } from "./hooks/useTasks";
import { CaptureBar } from "./components/CaptureBar";
import { Sidebar } from "./components/Sidebar";
import { TaskList } from "./components/TaskList";
import { parseInput } from "./lib/parse";
import { ProgressRing } from "./components/ProgressRing";
import { useAuth } from "./hooks/useAuth";
import { Login } from "./components/Login";
import { useState } from "react";


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
    const [menuAberto, setMenuAberto] = useState(false);
    const [listaAtiva, setListaAtiva] = useState<string | null>(null);

    const tarefasVisiveis = listaAtiva ? tasks.filter((t) => t.list_id === listaAtiva): tasks;


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

        <Sidebar 
        lists={lists}
        aberto={menuAberto}
        onFechar={() => setMenuAberto(false)}
        listaAtiva={listaAtiva}
        onSelecionarLista = {setListaAtiva}
         />

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="mx-auto max-w-2xl">
            <button
            onClick={() => setMenuAberto(true)}
            className="md:hidden text-2xl">
            ☰
            </button>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-accent">Taskly</h1>
            <ProgressRing progress={progresso}/>
            <div className="mt-6">
            <CaptureBar onAdd={handleAdd} />
            </div>
            <div className="mt-6">
            <TaskList tasks={tarefasVisiveis} onToggle={toggleTask} onRemove={removeTask} />
            </div>
        </div>
        </main>
    </div>
    );
}
