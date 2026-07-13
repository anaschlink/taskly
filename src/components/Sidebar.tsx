import type { List } from "../types";

interface SidebarProps {
  lists: List[];
  aberto: boolean;
  onFechar: () => void;
}

export function Sidebar({ lists, aberto, onFechar }: SidebarProps) {
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
        {lists.map((l) => (
          <div key={l.id} className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-neutral-600 hover:bg-neutral-100">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: l.color }} />
            {l.title}
          </div>
        ))}
        {lists.length === 0 && (
          <div className="px-2 text-xs text-neutral-400">crie com #nome</div>
        )}
      </aside>
    </>
  );
}