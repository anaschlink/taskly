import { useState } from "react";
import { signIn } from "../services/authServices";

export function Login() {
  const [email, setEmail] = useState("");
  const [enviado, setEnviado] = useState(false);

  async function handleEnviar() {
    const ok = await signIn(email);
    if (ok) setEnviado(true);
  }

  return (
    <div className="flex h-screen items-center justify-center bg-paper">
      <div className="w-80 rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="font-display text-2xl font-bold text-accent">Taskly</h1>
        <p className="mt-1 mb-6 text-sm text-neutral-500">anota e resolve</p>

        {enviado ? (
          <p className="text-sm text-neutral-700">
            Link enviado! Confere seu email e clica pra entrar.
          </p>
        ) : (
          <>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-accent"
            />
            <button
              onClick={handleEnviar}
              className="mt-3 w-full rounded-lg bg-accent py-2 text-sm font-medium text-white hover:opacity-90"
            >
              Enviar link de acesso
            </button>
          </>
        )}
      </div>
    </div>
  );
}