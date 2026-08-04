const ROWS = 8
const COLS = 9
const ROW_LETTERS = "ABCDEFGH"

function seatState(i, { taken, mine, selected }) {
  if (mine?.includes(i)) return "mine"
  if (taken?.includes(i)) return "taken"
  if (selected?.includes(i)) return "selected"
  return "free"
}

const stateClasses = {
  free: "bg-surface-2 text-white/50 border border-white/10 hover:bg-white/10 hover:-translate-y-0.5 cursor-pointer",
  selected:
    "bg-gold text-black border border-gold shadow-[0_0_16px_rgba(245,197,24,0.5)] font-bold cursor-pointer",
  taken: "bg-crimson/25 text-crimson/40 border border-crimson/20 cursor-not-allowed",
  mine: "bg-success text-black border border-success shadow-[0_0_16px_rgba(46,204,113,0.4)] font-bold",
}

export default function SeatMap({
  taken = [],
  mine = [],
  selected = [],
  onToggle,
  interactive = false,
}) {
  const rows = Array.from({ length: ROWS }, (_, r) => r)

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="mx-auto mb-10 h-2 w-4/5 rounded-full bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_10px_30px_rgba(255,255,255,0.35)]" />
      <p className="mb-8 text-center text-[11px] tracking-[0.4em] text-white/30">SCREEN</p>

      <div className="flex flex-col items-center gap-2.5">
        {rows.map((r) => {
          const cols = Array.from({ length: COLS }, (_, c) => c)
          return (
            <div key={r} className="flex items-center gap-2.5">
              <span className="w-4 text-xs font-semibold text-white/30">{ROW_LETTERS[r]}</span>
              {cols.map((c) => {
                const i = r * COLS + c
                const state = seatState(i, { taken, mine, selected })
                return (
                  <button
                    key={i}
                    type="button"
                    disabled={!interactive || state === "taken" || state === "mine"}
                    onClick={() => onToggle?.(i)}
                    className={`flex h-8 w-8 items-center justify-center rounded-t-md rounded-b-lg text-[10px] transition-all duration-150 sm:h-9 sm:w-9 ${
                      stateClasses[state]
                    } ${c === 3 ? "mr-3" : ""}`}
                  >
                    {state === "mine" ? "✓" : c + 1}
                  </button>
                )
              })}
            </div>
          )
        })}
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-5 rounded-xl bg-black/20 p-4 text-xs">
        <Legend swatch="bg-surface-2 border border-white/10" label="Available" />
        {interactive && <Legend swatch="bg-gold" label="Selected" />}
        {mine.length > 0 && <Legend swatch="bg-success" label="Your Seats" />}
        <Legend swatch="bg-crimson/25" label={mine.length > 0 ? "Occupied" : "Sold"} />
      </div>
    </div>
  )
}

function Legend({ swatch, label }) {
  return (
    <div className="flex items-center gap-2 text-white/60">
      <span className={`h-3.5 w-3.5 rounded ${swatch}`} />
      {label}
    </div>
  )
}
