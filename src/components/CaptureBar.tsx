import { useState } from "react"

interface CaptureBarProps{
    onAdd: (raw: string) => void;
}

export function CaptureBar({onAdd}: CaptureBarProps){
    const [text, setText] = useState("");
    return (
        <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) =>{
            if (e.key === "Enter"){
                onAdd(text);
                setText("")  ;
            }
        }
        }
        placeholder="O que precisa ser feito?"
        className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-base outline-none placeholder:text-neutral-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"/>

    )
}