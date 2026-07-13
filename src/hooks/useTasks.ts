import { useState, useEffect } from "react";
import { fetchTasks,insertTask, updateTask, deleteTask } from "../services/taskServices";
import { fetchLists, insertList, deleteList } from "../services/listServices";
import type {Task, List} from "../types"



export function useTasks(){
    const [tasks, setTasks] = useState<Task[]>([]);
    const [lists, setLists] = useState<List[]>([]);

    useEffect(() =>{
        async function loadtasks(){
            const [taskDataBase, listDataBase] = await Promise.all([fetchTasks(), fetchLists()]);
            setTasks(taskDataBase);
            setLists(listDataBase);
        }
        loadtasks();

    }, [])

    async function addTask(dados: {
        title: string;
        list_id: string | null;
        due_date: string | null;
        important: boolean;
        }) {
        const criada = await insertTask(dados);
        if (criada) {
            setTasks([criada, ...tasks]);
        }
    }
    async function toggleTask(id: string) {
    const alvo = tasks.find((t) => t.id === id);
    if (!alvo) return;
    const novoValor = alvo.completed_at ? null : new Date().toISOString();

    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed_at: novoValor } : t)));
    await updateTask(id, { completed_at: novoValor });
    } 

    async function removeTask(id: string) {
    setTasks(tasks.filter((t) => t.id !== id));
    await deleteTask(id);
    }

    async function removeList(id: string) {
    setLists(lists.filter((l) => l.id !== id));
    setTasks(tasks.map((t) => (t.list_id === id ? { ...t, list_id: null } : t)));
    await deleteList(id);
    }

    async function ensureList(name: string): Promise<string | null> {
    const existente = lists.find((l) => l.title === name);
    if (existente) return existente.id;

    const criada = await insertList(name);
    if (criada) {
        setLists([criada, ...lists]);
        return criada.id;
    }
    return null;
    }

    return {tasks, lists, addTask, toggleTask, removeTask,ensureList, removeList }
}

