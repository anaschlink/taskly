import { useState, useEffect} from "react";
import { insertSchedule, fetchSchedule, deleteSchedule, updateSchedule } from "../services/scheduleServices";
import type { NewScheduleTemplate, ScheduleTemplate } from "../lib/schedule";

export function useSchedule(){

    const [schedules, setSchedules] = useState<ScheduleTemplate[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function loadschedule() {
            const scheduleDatabase = await fetchSchedule();
            setSchedules(scheduleDatabase);
            setLoading(false)
        }
        loadschedule();

    }, [])

    async function addSchedule(template: NewScheduleTemplate){
    const criada = await insertSchedule(template);
        if (criada) {
            setSchedules([criada, ...schedules])
        }
    }

    async function removeSchedule(id: string){
        setSchedules(schedules.filter((l) => l.id !== id));
        await deleteSchedule(id);
    }

    async function editSchedule(id:string, changes: Partial<ScheduleTemplate>){
        setSchedules(schedules.map((s) => (s.id === id? { ...s, ...changes}: s )))
        await updateSchedule(id, changes)
    }

    return {schedules,loading,addSchedule, removeSchedule, editSchedule}
}