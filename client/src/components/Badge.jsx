const variants = {
  pending: "bg-orange-500/15 text-orange-400 border-orange-500/30",
  confirmed: "bg-success/15 text-success border-success/30",
  info: "bg-sky-500/15 text-sky-400 border-sky-500/30",
  gold: "bg-gold/15 text-gold border-gold/30",
}

export default function Badge({ variant = "info", children }) {
  return (
    <span
      className={`inline-block rounded border px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider ${variants[variant]}`}
    >
      {children}
    </span>
  )
}
