export default function PanelCard({ title, tag, children }) {
  return (
    <section className="rounded-xl border border-neutral-200 bg-white shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-neutral-200 bg-neutral-100/70">
        <h2 className="text-sm font-semibold text-navy-600">{title}</h2>
        {tag && <span className="font-mono text-2xs uppercase tracking-wider text-neutral-500">{tag}</span>}
      </div>
      {children}
    </section>
  );
}
