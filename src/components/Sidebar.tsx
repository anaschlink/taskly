import type { List } from "../types";
import { useState } from "react";
import { PALETA } from "../hooks/useTasks";

interface SidebarProps {
  lists: List[];
  aberto: boolean;
  onFechar: () => void;
  listaAtiva: string | null;
  onSelecionarLista: (id: string | null) => void;
  onExcluirLista: (id: string) => void;
  onMudarCor: (id: string, color: string) => void;
  onSair: () => void;
}

export function Sidebar({ lists, aberto, onFechar, listaAtiva, onSelecionarLista, onExcluirLista, onMudarCor, onSair }: SidebarProps) {
  const [corAberta, setCorAberta] = useState<string | null>(null);
  return (
    <>
      {aberto && (
        <div className="fixed inset-0 z-10 bg-black/30 md:hidden" onClick={onFechar} />
      )}

      <aside
        className={`fixed z-20 h-full w-60 shrink-0 flex-col gap-1 border-r border-neutral-200 bg-white p-4 ${aberto ? "flex" : "hidden"} md:static md:z-auto md:flex`}
      >
        <div className="mb-4">
          <div className="font-display text-xl font-bold text-ink">Taskly</div>
          <div className="text-xs text-neutral-400">anota e resolve</div>
        </div>

        <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-neutral-400">
          Listas
        </div>
        <button
          onClick={() => { onSelecionarLista(null); onFechar(); }}
          className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm ${
            listaAtiva === null ? "bg-accent-soft text-accent font-medium" : "text-neutral-600 hover:bg-neutral-100"
          }`}
        >
          Todas
        </button>
        {lists.map((l) => (
          <div key={l.id} className="flex flex-col">
            <div className={`group flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm ${
              listaAtiva === l.id ? "bg-accent-soft text-accent font-medium" : "text-neutral-600 hover:bg-neutral-100"
            }`}>
              <button
                onClick={(e) => { e.stopPropagation(); setCorAberta(corAberta === l.id ? null : l.id); }}
                className="h-3 w-3 shrink-0 rounded-full"
                style={{ background: l.color }}
                aria-label="Mudar cor"
              />
              <button
                onClick={() => { onSelecionarLista(l.id); onFechar(); }}
                className="flex-1 text-left"
              >
                {l.title}
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onExcluirLista(l.id); }}
                className="text-neutral-300 opacity-100 md:opacity-0 group-hover:md:opacity-100 hover:text-red-500"
              >
                ×
              </button>
            </div>

            {corAberta === l.id && (
              <div className="flex gap-1.5 px-2 py-2">
                {PALETA.map((cor) => (
                  <button
                    key={cor}
                    onClick={() => { onMudarCor(l.id, cor); setCorAberta(null); }}
                    className="h-5 w-5 rounded-full border border-neutral-200"
                    style={{ background: cor }}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
        {lists.length === 0 && (
          <div className="px-2 text-xs text-neutral-400">crie com #nome</div>
        )}
      <button
        onClick={onSair}
        className="mt-auto rounded-lg px-2 py-1.5 text-left text-sm text-neutral-500 hover:bg-neutral-100"
      >
        Sair
      </button>
      </aside>
    </>
  );
}