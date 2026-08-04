export default function Footer() {
  return (
    <footer className="mt-24 border-t border-white/5 bg-surface/40">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <span className="font-display text-xl tracking-widest text-gold">
            GA <span className="text-white">CINEMA</span>
          </span>
          <p className="text-sm text-white/40">
            &copy; {new Date().getFullYear()} GA Cinema. Every seat is the best seat.
          </p>
        </div>
      </div>
    </footer>
  )
}
