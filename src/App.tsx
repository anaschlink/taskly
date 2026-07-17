import { useTasks } from "./hooks/useTasks";
import { CaptureBar } from "./components/CaptureBar";
import { Sidebar } from "./components/Sidebar";
import { TaskList } from "./components/TaskList";
import { parseInput } from "./lib/parse";
import { ProgressRing } from "./components/ProgressRing";
import { useAuth } from "./hooks/useAuth";
import { Login } from "./components/Login";
import { useState } from "react";
import { signOut } from "./services/authServices";
import { WeekView } from "./components/WeekView";

export function App(){
    const session = useAuth()
    if (!session){
        return <Login />
    }

    return <Taskly />
}

function Taskly(){
    const { tasks, lists, addTask, toggleTask, removeTask, ensureList, removeList, mudarCorLista } = useTasks();

    const concluidas = tasks.filter((t) => t.completed_at).length;
    const progresso = tasks.length === 0 ? 0 : concluidas / tasks.length;
    const [menuAberto, setMenuAberto] = useState(false);
    const [listaAtiva, setListaAtiva] = useState<string | null>(null);
    const [view, setView] = useState<"capture" | "week"> ("capture");

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
        onExcluirLista={removeList}
        onMudarCor={mudarCorLista}
        onSair={signOut}
         />

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="mx-auto max-w-2xl">
            <h1
            onClick={() => setMenuAberto(true)}
             className="font-display text-2xl md:text-3xl font-bold text-accent cursor-pointer md:cursor-default">Taskly</h1>
            <div className="flex items-center justify-between">
            <button  onClick={() => setView(view === "capture" ? "week" : "capture")}>📅</button>
            <ProgressRing progress={progresso}/>
            </div>
            {view === "capture" ? (
            <>
            <div className="mt-6">
            <CaptureBar onAdd={handleAdd} />
            </div>
            <div className="mt-6">
            {tarefasVisiveis.length === 0? (
                <p className="mt-10 text-center text-sm text-neutral-400">Tudo limpo por aqui. Solta a próxima tarefa lá em cima.  ✨</p>
            ): 
            <TaskList tasks={tarefasVisiveis} onToggle={toggleTask} onRemove={removeTask} />
        }
            </div>
            </>
            ): (
                <WeekView />
            )}
        </div>
        </main>
    </div>
    );
}
