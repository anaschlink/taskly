export interface List {
    id: string;
    title: string;
    color: string;


}

export interface Task {
    id: string;
    title: string;
    list_id: string | null ;
    due_date: string | null;
    important: boolean;
    created_at: string;
    completed_at: string | null;
    schedule_template_id?: string;
    scheduled_date?: string;

}