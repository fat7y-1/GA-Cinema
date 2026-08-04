import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { api } from "../api/client"

export default function TmdbSearch({ onPick }) {
  const [query, setQuery] = useState("")
  const [submittedQuery, setSubmittedQuery] = useState("")
  const [pickingId, setPickingId] = useState(null)

  const { data, isFetching, isError, error } = useQuery({
    queryKey: ["tmdb-search", submittedQuery],
    queryFn: () => api.get(`/admin/tmdb/search?q=${encodeURIComponent(submittedQuery)}`),
    enabled: submittedQuery.length > 0,
    retry: false,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) setSubmittedQuery(query.trim())
  }

  const handlePick = async (result) => {
    setPickingId(result.tmdbId)
    try {
      const { movie } = await api.get(`/admin/tmdb/${result.tmdbId}`)
      onPick(movie)
      toast.success(`Filled in from "${result.title}" — review details below.`)
    } catch (err) {
      toast.error(err.message)
    } finally {
      setPickingId(null)
    }
  }

  return (
    <div className="card p-6">
      <h2 className="text-sm font-bold uppercase tracking-wide text-gold">Find on TMDB</h2>
      <p className="mb-4 mt-1 text-xs text-white/40">
        Search for the real title to auto-fill an official poster, description, language and trailer.
      </p>

      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          className="field"
          placeholder="e.g. Interstellar"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn-gold shrink-0 !px-6" disabled={!query.trim()}>
          Search
        </button>
      </form>

      {isFetching && <p className="mt-4 text-sm text-white/40">Searching…</p>}

      {isError && (
        <p className="mt-4 rounded-md border border-crimson/30 bg-crimson/10 px-4 py-3 text-sm text-crimson">
          {error.message}
        </p>
      )}

      {data && data.results.length === 0 && (
        <p className="mt-4 text-sm text-white/40">No results for "{submittedQuery}".</p>
      )}

      {data && data.results.length > 0 && (
        <div className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
          {data.results.map((r) => (
            <button
              key={r.tmdbId}
              type="button"
              onClick={() => handlePick(r)}
              disabled={pickingId !== null}
              className="group overflow-hidden rounded-lg border border-white/10 text-left transition hover:-translate-y-1 hover:border-gold disabled:opacity-40"
            >
              <div className="relative aspect-[2/3] bg-surface-2">
                <img src={r.posterUrl} alt={r.title} className="h-full w-full object-cover" loading="lazy" />
                {pickingId === r.tmdbId && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-xs text-gold">
                    Loading…
                  </div>
                )}
              </div>
              <div className="p-2">
                <p className="truncate text-xs font-semibold text-white">{r.title}</p>
                <p className="text-[11px] text-white/40">{r.year}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
