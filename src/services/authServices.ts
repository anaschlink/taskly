import { supabase } from "../lib/supabase";

export async function signIn(email: string){
    const {error} = await supabase.auth.signInWithOtp({
        email,
        options: {
            emailRedirectTo: window.location.origin,

        },
    });

    if (error){
        console.error("Erro ao enviar o link:", error);
        return false;
    }
    return true;
}

export async function signOut(){
    await supabase.auth.signOut();
}