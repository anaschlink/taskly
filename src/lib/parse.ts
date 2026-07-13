import { todayISO, addDays, weekdays, names, nextWeekday } from "./dates";

export function parseInput(raw: string) {
    let title = raw;
    let listName: string | null = null;
    let due: string | null = null;
    let important = false

    const m = title.match(/#(\w+)/);


    if (m){
        listName = m[1];
        title = title.replace(m[0], " ");
    }

    if (title.includes("!")) {
        important = true;
        title = title.replace(/!/g, "");
    }

    const palavras = title.split(" ");
    for (const palavra of palavras){
        if (palavra in names) {       
            due = addDays(todayISO(), names[palavra]);    
            title = title.replace(palavra, "");  
            }
        else if(palavra in weekdays){
            due= nextWeekday(weekdays[palavra])
            title = title.replace(palavra, "");  
        }
    }
        
    
        title = title.replace(/\s+/g, " ").trim()
    return {title,  listName, due, important};
}
