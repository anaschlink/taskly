export interface ScheduleTemplate {
    id: string;
    user_id: string;
    activity: string;
    days_of_week: number[];
    start_time: string;
    end_time: string;
    color?: string;
    created_at: string;
}

export type NewScheduleTemplate = Omit<ScheduleTemplate, "id" | "user_id" | "created_at">;

export interface ScheduleOccurrence {
    date: string;
    start_time: string;
    end_time: string;
    activity: string;
    color?: string;
    template_id: string;
}

export function expandScheduleTemplate(template: ScheduleTemplate, startDate: string, endDate: string): ScheduleOccurrence[]{
    const ocorrence: ScheduleOccurrence[] = []
    const cursor =  new Date(startDate);
    const limit = new Date(endDate);

    while(cursor <= limit){
        const dayWeek = cursor.getUTCDay()

        if (template.days_of_week.includes(dayWeek)){

            ocorrence.push({
            date: cursor.toISOString().split("T")[0],
            start_time: template.start_time,
            end_time: template.end_time,
            activity: template.activity,
            color: template.color,
            template_id: template.id,
            });

        }

        cursor.setUTCDate(cursor.getUTCDate() + 1)
    
    }

    return ocorrence
}

export function expandTemplates(templates: ScheduleTemplate[], startDate: string, endDate: string): ScheduleOccurrence[] {

    const list  = templates.flatMap((t) => expandScheduleTemplate(t, startDate, endDate))
    return list 
}

export function getWeekDays(today: string): string[]{
    const weekDays : string[] = []
    const cursor = new Date(today)
    const dia = cursor.getUTCDay()
    const ajustado = dia === 0 ? 7 : dia
    const voltar = ajustado - 1

    cursor.setUTCDate(cursor.getUTCDate() - voltar)
    
    for( let i = 1; i<=7; i++ ){
        weekDays.push(cursor.toISOString().split("T")[0])

        cursor.setUTCDate(cursor.getUTCDate() + 1 )
    }

    return weekDays
}

export function todayISO() : string{
    const d= new Date()
    const ano = String(d.getFullYear())
    const mes = String(d.getMonth() + 1).padStart(2, '0')
    const dia = String(d.getDate()).padStart(2, '0')

    const today = ano + "-" + mes + "-" + dia; 

    return today 

}

console.log(todayISO())